import { ProcessedRequest } from "../model/ProcessedRequest";
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

var debug = require('debug')('processLogFileManager')
var lastCount = 1;

export class ProcessLogFileManager {
    constructor(public name: string) {
    }

    public async getLogs(): Promise<ProcessedRequest[]> {

        return new Promise<ProcessedRequest[]>((resolve, reject) => {
            var searchPath = this.getLogDirectory() + '/*.log'
            debug('search path:' + searchPath)
            var self = this;
            glob(searchPath, {}, async function (err, files) {
                if (err) {
                    debug('error enumerating:' + err)
                    reject(err)
                } else {

                    try {
                        var requests = []
                        files.forEach(file => {
                            requests.push(self.parseLogFileSync(file));
                        })
                        resolve(requests);

                    } catch (error) {
                        reject(error)
                    }
                }
            })
        });
    }

    public async writeLog(processRequest: ProcessedRequest) {
        return new Promise<void>((resolve, reject) => {
            try {
                this.writeLogSync(processRequest);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private writeLogSync(processRequest: ProcessedRequest) {
        debug('writing logs')
        var logDirectory = this.getLogDirectory()
        debug('logDirectory:' + logDirectory)
        if (!fs.existsSync(logDirectory)) {
            debug('log directory ' + logDirectory + ' does not exists and hence not writing')
            return
        }

        debug('checking for available log file name.')
        var logFile = this.getAvailableLog(logDirectory)

        var data = processRequest.date.toString()
        data += "\r\n"
        data += "\r\n"
        data += "------- BEGIN STATUS  -----------\r\n";
        data += processRequest.status;
        data += "\r\n"
        data += "------- END STATUS -----------\r\n";
        data += "\r\n"

        data += "------- BEGIN MATCHES  -----------\r\n";
        if (processRequest.matches !== undefined) {
            data += processRequest.matches.join()
        }
        data += "\r\n"
        data += "------- END MATCHES -----------\r\n";
        data += "\r\n"

        data += "------- BEGIN REQUEST -----------\r\n";
        data += processRequest.request;
        data += "\r\n"
        data += "------- END REQUEST -----------\r\n";
        data += "\r\n"

        data += "------- BEGIN RESPONSE -----------\r\n";
        data += processRequest.response
        data += "\r\n"
        data += "------- END RESPONSE -----------\r\n";

        debug('writing to :' + logFile)
        fs.writeFileSync(logFile, data)
    }

    private getAvailableLog(parent) {
        var fileName = parent.toString() + path.sep + lastCount.toString() + '.log'
        lastCount = lastCount + 1
        if (lastCount > 10) {
            lastCount = 1
        }
        return fileName;
    }

    private getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }

    private getLogDirectory(): string {
        return process.cwd() + path.sep + 'data' + path.sep + this.name + path.sep + 'logs';
    }

    private parseLogFileSync(file: string): ProcessedRequest {
        var data = fs.readFileSync(file, 'utf-8')
        var request: string = '';
        var response: string = '';
        var matches: string[];
        var requestStarted: boolean;
        var responseStarted: boolean;
        var matchStarted: boolean;
        var firstLine: boolean = true;
        var date: Date;

        data.split('\r\n').forEach(line => {
            if (firstLine) {
                date = new Date(Date.parse(line))
                firstLine = false
            }
            if (line.includes('END REQUEST')) {
                requestStarted = false
            } else if (line.includes('END RESPONSE')) {
                responseStarted = false
            } else if (line.includes('END MATCHES')) {
                matchStarted = false
            }

            if (requestStarted) {
                request += line
            } else if (responseStarted) {
                response += line
            } else if (matchStarted) {
                matches = line.split(',');
            }

            if (line.includes('BEGIN REQUEST')) {
                requestStarted = true
            } else if (line.includes('BEGIN RESPONSE')) {
                responseStarted = true
            } else if (line.includes('BEGIN MATCHES')) {
                matchStarted = true
            }
        });

        return new ProcessedRequest(date, 0, request, response, matches);
    }

}