import { Component, OnInit } from '@angular/core';
import { HostService } from '../host-service';
import { ActivatedRoute } from '@angular/router';
import { ServedRequests } from '../ServedRequest';

@Component({
  selector: 'app-host-viewservedrequests',
  templateUrl: './host-viewservedrequest.component.html',
  styleUrls: ['./host-viewservedrequest.component.css']
})
export class HostViewServedRequestComponent implements OnInit {

  errorMessage: string;
  name: string;
  fileName: string;
  constructor(private _route: ActivatedRoute,private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.fileName = this._route.snapshot.paramMap.get('file')
  }

  servedRequest: ServedRequests;
  ngOnInit(): void {
    this._hostService.getServedRequest(this.name, this.fileName)
      .subscribe(servedRequest => this.servedRequest = servedRequest,
        error => this.errorMessage = <any>error)
  }

}
