import { HostManager} from '../HostManager';
import { Host } from '../model/Host';
const TestData = require('../testdata/testdata1')

export class InMemoryProvider implements HostManager{
    public getHosts() : Host[]{
        return TestData;
    }
    
    public getHost(name: string) : Host{
        return TestData.find(h => h.name == name)
    }
}