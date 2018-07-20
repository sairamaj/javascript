import {Component, OnInit} from '@angular/core'
import { HostService } from '../../host/host-service';
import { IHost } from '../../host/host';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { IService } from '../../models/IService';
@Component(
    {
        selector : 'sim-hosts',
        templateUrl : './service-list.component.html',
        styleUrls: ['./service-list.component.css']
    }    
)

export class ServiceListComponent implements OnInit{

    services : IService[] = [];
    errorMessage : string;
    pageTitle : string = 'Hosts'

    ngOnInit(): void {
        this._hostService.getServices()
        .subscribe(result => this.services = result,
            error => this.errorMessage = <any>error )
    }

    constructor(private _hostService : HostService,private _http: HttpClient){
    }
}