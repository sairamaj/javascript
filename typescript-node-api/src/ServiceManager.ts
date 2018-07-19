import { Service } from './model/Service';
import { ProcessInfo } from './model/ProcessInfo';
import { ProcessedRequest } from './model/ProcessedRequest';

export interface ServiceManager {
    getServices(): Promise<Service[]>;
    getService(name: string): Promise<Service>;
    getResponse(name: string, request: string): Promise<ProcessInfo>;
    logRequest(date: Date, status: number, processInfo: ProcessInfo): Promise<boolean>;
    getProcessedRequests(): Promise<ProcessedRequest[]>
    clearProcessedRequests(): Promise<boolean>
}