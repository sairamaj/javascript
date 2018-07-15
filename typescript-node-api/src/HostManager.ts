import { Host} from './model/Host';

export class HostManager {
    getHosts() : Host[] {
        return [
            new Host('datasafe'),
            new Host('xp2'),
            new Host('cbsconsumer'),
            new Host('spectrum'),
            new Host('dna'),
            new Host('fis'),
        ];
    }

    getHost(name: string) : Host{
        return this.getHosts().find(h => h.name == name)
    }
}