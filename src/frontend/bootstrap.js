import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import AppComponent from './app/components/app.component'
import ExampleComponent from './app/components/example.component'
import LoginComponent from './app/components/login.component'
import CreateInscriptionComponent from './app/components/create-inscription.component'
import QuestionComponent from './app/components/question.component'

import { RouterModule }  from '@angular/router';

let router = RouterModule.forRoot([
  { path: 'login', component: LoginComponent },
  { path: 'create-inscription', component: CreateInscriptionComponent },
  { path: 'question/:token', component: QuestionComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule, NgxPaginationModule ],
  declarations: [
    AppComponent,
    ExampleComponent,
    LoginComponent,
    CreateInscriptionComponent,
    QuestionComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)