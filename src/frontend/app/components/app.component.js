import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  template: `<h1>Base {{name}}</h1>
            <router-outlet></router-outlet>`
})
export default class AppComponent {
  constructor() {
    this.name = 'project'
  }
}