import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResponseMap } from './responsemap';
import { HostService } from './host-service';

@Component({
  selector: 'app-host.detail',
  templateUrl: './host.detail.component.html',
  styleUrls: ['./host.detail.component.css']
})
export class HostDetailComponent implements OnInit {

  name: string;
  responseMaps: IResponseMap[];
  errorMessage: string;

  constructor(private _route: ActivatedRoute, private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name')
  }

  ngOnInit(): void {
    this._hostService.getServiceDetails(this.name)
      .subscribe(responseMaps => this.responseMaps = responseMaps,
        error => this.errorMessage = <any>error)
  }

} 