import { HttpClient } from '@angular/common/http'

export class Config {
    baseUrl: string
    getHostsUrl : string
    constructor(){
        this.baseUrl = 'http://localhost:3000'
        //this.baseUrl = ''
        this.getHostsUrl = this.baseUrl + '/api/v1/admin/services'
    }

    getServiceDetailsUrl(name:string): string{
        return this.baseUrl + this.getHostsUrl + '/' + name
    }

    getHostResponseFileUrl(name:string, file: string) : string{
        return this.baseUrl + "/admin/api/hosts/" + name + '/details/response/' + file
    }

    getHostRequestFileUrl(name:string, mapName: string) : string{
        return this.baseUrl + "/admin/api/hosts/" + name + '/details/request/' + mapName
    }

    getHostSimulatorUrl(name:string) : string{
        return this.baseUrl + "/admin/api/" + name
    }

    getAddNewResponseUrl(name:string) : string{
        return this.baseUrl + "/admin/api/hosts/" + name + '/response'
    }

    getLastRequestUrl(name:string): string{
        return this.baseUrl + "/admin/api/hosts/" + name + '/lastrequests'
    }

    getMapDetailUrl(hostName: string, mapName: string){
        return this.baseUrl + "/admin/api/hosts/" + hostName + '/map/' + mapName
    }

    getServedRequests(hostName: string){
        return this.baseUrl + "/admin/api/hosts/" + hostName + '/servedrequests/'
    }

    getServedRequest(hostName: string, fileName: string){
        return this.baseUrl + "/admin/api/hosts/" + hostName + '/servedrequests/' + fileName + '/'
    }
}

export class Configuration {
    Config: Config;

    constructor(private _http: HttpClient) {
        console.log('before get...')
        // this._http.get("./assets/config.json")
        //     .subscribe(res => {
        //         console.log('in res:' + res)
        //         this.Config = <Config>res
        //         console.log('getHostUrl:' + this.Config.getHostsUrl)
        //     })
        console.log('after  get...')
    }
}