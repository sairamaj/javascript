import { Host} from './model/Host';

export interface HostManager {
    getHosts() : Host[];
    getHost(name: string) : Host;
}