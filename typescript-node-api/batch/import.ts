import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import * as mongoose from "mongoose";
import { ServiceSchema } from '../src/model/ServiceSchema';
import { ResponseSchema } from '../src/model/ResponseSchema';
import { resolve } from 'url';

const ServiceDbSchema = mongoose.model('services', ServiceSchema);
const ResponseDbSchema = mongoose.model('responses', ResponseSchema);

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
    // public mongoUrl: string = 'mongodb://localhost:27017/simulator';
    public mongoUrl: string = 'mondbconnectionhere.'
    constructor(public path: string) {
        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;

        console.log('connecting...')
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        
        console.log('connected...')
    }

    public async import(): Promise<void> {

        var services = await this.getServices();
        var data = this.createServicesCollectionInfo(services);
        console.log('inserting services...')
        await ServiceDbSchema.collection.insertMany(data, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('success:' + result.insertedCount);
            }
        });

        console.log('inserting responses...')
        services.forEach(async s => {
            s.config.forEach(async c => {
                var responseNameKey = s.name + "_response_" + c.name;
                var responseFileName = s.path + path.sep + 'responses' + path.sep + c.name + '.xml'
                await this.insertResponse(responseNameKey, responseFileName);
            });
        });
    }

    public async clear(): Promise<void> {
        ServiceDbSchema.collection.remove({}, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('clear services success:');
            }
        });
        ResponseDbSchema.collection.remove({}, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('clear responses success:');
            }
        });
    }

    private async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve, reject) => {
            glob(this.path + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dirs.map(d => {
                        var mapFile = d + path.sep + 'config' + path.sep + 'map.json';
                        return new Service(d.split('/').slice(-1)[0], d, JSON.parse(fs.readFileSync(mapFile, 'utf-8')));
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


    private async insertResponse(name: string, fileName: string) {
        await fs.readFile(fileName, 'utf-8', async (err, data) => {
            if (err) {
                console.log('err:' + err)
            } else {
                await ResponseDbSchema.collection.insertOne({ name: name, response: data }, (err, result) => {
                    if (err) {
                        console.log('error for:' + name);
                    } else {
                        console.log('success for:' + name);
                    }
                });
            }
        });
    }
}

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}
if (process.argv.length < 3) {
    console.error('data path required.')
    process.exit(-1)
}

var dataPath = process.argv[2]
console.log('importing:' + dataPath);
var importService = new ImportService(dataPath);
async function clearAndImport() {
    console.log('clearing...')
    await importService.clear();
    console.log('importing...')
    await importService.import();
}

clearAndImport()
    .then(result => {
        console.log('final success');
    }).catch(err => {
        console.log('final:' + err);
    })

