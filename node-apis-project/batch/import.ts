import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import * as mongoose from "mongoose";

var mongoUrl: string = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

const Service = mongoose.model('services', ServiceSchema);

export class ServiceConfigMap {
    constructor(
        public name: string,
        public matches: string[]
    ) {
    }
}

class Service {
    constructor(public name: string, public path: string, public config: ServiceConfigMap[]) {
    }
}

class ImportService {
    constructor(public path: string) {

    }

    public async import(): Promise<void> {
        var services = await this.getServices();
        var data = this.createServicesCollectionInfo(services);
        console.log(JSON.stringify(data, null, '\t'))
    }

    private async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve, reject) => {
            glob(this.path + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dirs.map(d => {
                        var mapFile = d + path.sep + 'config' + path.sep + 'map.json';
                        return new Service(d.split('/').slice(-1)[0], d, JSON.parse( fs.readFileSync(mapFile, 'utf-8')));
                    }));
                }
            });
        });
    }

    private createServicesCollectionInfo(services: Service[]): any {
        var data = []
        services.forEach(s => {
            data.push({
                name: s.name,
                config: s.config
            })
        })

        return data;
    }
}

var dataPath = 'E:\\dev\\sairamaj\\javascript\\typescript-node-api\\data'
var importService = new ImportService(dataPath);
importService.import();