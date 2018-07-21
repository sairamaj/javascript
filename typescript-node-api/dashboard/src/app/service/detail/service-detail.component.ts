import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseMap } from '../../host/responsemap';
import { HostService } from '../../host/host-service';
import { Service } from '../../models/Service';

@Component({
  selector: 'app-host.detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  name: string;
  service: Service;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this._hostService.getServiceDetails(this.name)
      .subscribe(service => this.service = service,
        error => this.errorMessage = <any>error);
  }

  onTest(requestFile: string): void {
    this._router.navigate(['/hosts/' + this.name + '/' + requestFile + '/test']);
  }

  onEdit(mapName: string): void {
    this._router.navigate(['hosts/' + this.name + '/newresponse/' + mapName]);
  }

  onNew(): void {
    this._router.navigate(['hosts/' + this.name + '/newresponse']);

  }


  onLastServedRequests(): void {
    this._router.navigate(['hosts/' + this.name + '/servedrequests']);

  }
} 