import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'question',
  template: `<section id="">
  <div class="container">
    <h3>Objetos 1: Lunes 18 a 22</h3>
    <label class="custom-control custom-radio">
      <input id="radio1" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Ya la aprobé</span>
    </label>
    <label class="custom-control custom-radio">
      <input id="radio2" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Todavía no voy a cursar</span>
    </label>            
    <label class="custom-control custom-radio">
      <input id="radio3" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Voy a cursar en C1</span>
    </label>
  </div>
</section>`,
  styleUrls: ['./assets/styles.css']
})
export default class QuestionComponent {

  constructor(http, router) { 
    this.http = http;
    this.router = router;
  }

}

  QuestionComponent.parameters = [
  Http, Router
]

