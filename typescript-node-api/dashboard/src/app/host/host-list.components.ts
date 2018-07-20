import {Component, OnInit} from '@angular/core'
import { HostService } from './host-service';
import { IHost } from './host';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
@Component(
    {
        selector : 'sim-hosts',
        templateUrl : './host-list.component.html',
        styleUrls: ['./host-list.component.css']
    }    
)


export class HostComponent implements OnInit{

    hosts : IHost[] = [];
    errorMessage : string;
    pageTitle : string = 'Hosts'

    ngOnInit(): void {
        this._hostService.getHosts()
        .subscribe(result => this.hosts = result,
            error => this.errorMessage = <any>error )
    }

    constructor(private _hostService : HostService,private _http: HttpClient){
    }
}