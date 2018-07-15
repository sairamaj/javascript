import { Host} from './model/Host';
import { ProcessInfo } from './model/ProcessInfo';

export interface HostManager {
    getHosts() : Host[];
    getHost(name: string) : Host;
    getResponse(name: string, request: string) : ProcessInfo;
}