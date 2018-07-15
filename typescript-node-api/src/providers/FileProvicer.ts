import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';

export class FileProvider implements ServiceManager {
    public getServices(): Service[] {
        return null;
    }

    public getService(name: string): Service {
        return null;
    }

    public getResponse(name: string, request: string): ProcessInfo {
        return null;
    }
}