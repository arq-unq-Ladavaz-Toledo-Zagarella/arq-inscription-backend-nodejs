import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'
import { DropdownModule } from "ngx-dropdown";
import AppComponent from './app/components/app.component'
import ExampleComponent from './app/components/example.component'
import LoginComponent from './app/components/login.component'
import CreateInscriptionComponent from './app/components/create-inscription.component'
import QuestionComponent from './app/components/question.component'
import ThanksComponent from './app/components/thanks.component'
import NavbarComponent from './app/components/navbar.component'
import InscriptionStateComponent from './app/components/inscription-state.component'
import CoursesStateComponent from './app/components/courses-state.component'

import { RouterModule }  from '@angular/router';

let router = RouterModule.forRoot([
  { path: 'login', component: LoginComponent },
  { path: 'create-inscription', component: CreateInscriptionComponent },
  { path: 'question/:token', component: QuestionComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'inscription-state', component: InscriptionStateComponent },
  { path: 'courses-state', component: CoursesStateComponent },  
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule, NgxPaginationModule, DropdownModule ],
  declarations: [
    AppComponent,
    ExampleComponent,
    LoginComponent,
    CreateInscriptionComponent,
    QuestionComponent,
    ThanksComponent,
    InscriptionStateComponent,
    CoursesStateComponent,
    NavbarComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)