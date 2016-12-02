import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { DataService } from './services/data.service';
import { TitleCase } from './services/titlecase.pipe';

import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
    { path: '',      component: DashboardComponent },
    { path: 'order', component: OrderComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
      ToastComponent,
      TitleCase
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
      routing,
      ModalModule
  ],
  providers: [
    DataService,
      ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
