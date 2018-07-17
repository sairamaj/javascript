import { Service} from './model/Service';
import { ProcessInfo } from './model/ProcessInfo';

export interface ServiceManager {
    getServices() : Promise<Service[]>;
    getService(name: string) : Promise<Service>;
    getResponse(name: string, request: string) : ProcessInfo;
}