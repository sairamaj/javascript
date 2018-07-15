import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
const TestData = require('../testdata/testdata1')

export class InMemoryProvider implements ServiceManager {
    public getServices(): Service[] {
        return TestData;
    }

    public getService(name: string): Service {
        return TestData.find(h => h.name == name)
    }

    public getResponse(name: string, request: string): ProcessInfo {
        
        var service = this.getService(name);
        if(service === undefined || service.config === undefined){
            return undefined;
        }
        
        var foundConfig = service.config.find(c=> {
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