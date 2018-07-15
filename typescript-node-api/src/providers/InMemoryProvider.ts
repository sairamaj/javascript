import { HostManager } from '../HostManager';
import { Host } from '../model/Host';
import { ProcessInfo } from '../model/ProcessInfo';
const TestData = require('../testdata/testdata1')

export class InMemoryProvider implements HostManager {
    public getHosts(): Host[] {
        return TestData;
    }

    public getHost(name: string): Host {
        return TestData.find(h => h.name == name)
    }

    public getResponse(name: string, request: string): ProcessInfo {
        
        var host = this.getHost(name);
        if(host === undefined || host.config === undefined){
            return undefined;
        }
        
        var foundConfig = host.config.find(c=> {
            if( c.matches === undefined){
                return false;
            }
            var match =  c.matches.find( m => request.includes(m) ) !== undefined;
            console.log('match :' + match)
            return match;
        })

        console.log('foundConfig:' + foundConfig)
        if( foundConfig === undefined){
            return undefined;
        }

        var processInfo = new ProcessInfo(request);
        processInfo.matches = [];
        processInfo.response = foundConfig.response;
        return processInfo;
    }
}