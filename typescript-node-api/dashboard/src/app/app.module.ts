import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ServiceListComponent } from './service/list/service-list.components';
import { ServiceDetailComponent } from './service/detail/service-detail.component';
import { HostDetailResponseComponent } from './host/host-detail-response.component';
import { HostDetailRequestComponent } from './host/host-detail-request.component';
import { ServiceTestComponent } from './service/test/service-test.component';
import { ServiceEditResponseComponent } from './service/edit/service-edit-response.component';
import { HostServedrequestsComponent } from './host/host-servedrequests/host-servedrequests.component';
import { HostViewServedRequestComponent } from './host/host-viewservedrequest/host-viewservedrequest.component';
import { XmlPipe } from './XmlPipe';

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    HostDetailResponseComponent,
    HostDetailRequestComponent,
    ServiceTestComponent,
    ServiceEditResponseComponent,
    HostServedrequestsComponent,
    HostViewServedRequestComponent,
    XmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'services', component: ServiceListComponent },
      { path: 'hosts/:name/newresponse', component: ServiceEditResponseComponent },
      { path: 'hosts/:name/newresponse/:mapname', component: ServiceEditResponseComponent },
      { path: 'hosts/:name/:mapname/test', component: ServiceTestComponent },
      { path: 'services/:name', component: ServiceDetailComponent },
      { path: 'hosts/:name/details/response/:file', component: HostDetailResponseComponent },
      { path: 'hosts/:name/details/request/:file', component: HostDetailRequestComponent },
      { path: 'hosts/:name/servedrequests', component: HostServedrequestsComponent },
      { path: 'hosts/:name/servedrequests/:file', component: HostViewServedRequestComponent },
      { path: '', component: ServiceListComponent },
      { path: '*', component: ServiceListComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
