import { Component, OnInit } from '@angular/core';
import { ServedRequests } from '../ServedRequest';
import { HostService } from '../host-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-host-servedrequests',
  templateUrl: './host-servedrequests.component.html',
  styleUrls: ['./host-servedrequests.component.css']
})
export class HostServedrequestsComponent implements OnInit {

  errorMessage: string;
  name: string;
  constructor(private _route: ActivatedRoute,private _hostService: HostService) {

    this.name = this._route.snapshot.paramMap.get('name')
  }

  servedRequests: ServedRequests[];
  ngOnInit(): void {
    this._hostService.getLastRequests(this.name)
      .subscribe(servedRequests => this.servedRequests = servedRequests,
        error => this.errorMessage = <any>error)
  }

}
