import { Component, OnInit } from '@angular/core';
import { HostService } from './host-service';
import { ActivatedRoute } from '@angular/router';
import { hostResponseData } from './hostResponseData';

@Component({
  selector: 'app-host-test',
  templateUrl: './host-test.component.html',
  styleUrls: ['./host-test.component.css']
})
export class HostTestComponent implements OnInit {
  response: hostResponseData
  name: string;
  mapname: string
  _request: string
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.mapname = this._route.snapshot.paramMap.get('mapname')
  }

  get request(): string {
    return this._request;
  }
  set request(value: string) {
    this._request = value;
  }
  ngOnInit() {
    this._hostService.getHostRequestFileContent(this.name, this.mapname)
      .subscribe(response => this.request = response,
        error => this.errorMessage = <any>error)
  }

  onSubmit(): void {
    console.log('submitting...')
    this.errorMessage = null
    this.response = null
    this._hostService.submitRequest(this.name, this.request)
      .subscribe(response => this.response = response,
        error => this.errorMessage = <any>error)
  }

}
