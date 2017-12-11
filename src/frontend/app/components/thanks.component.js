import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'thanks',
  template: `<div class="container" align="center"> 
    <a href="http://www.unq.edu.ar/">
      <img src="http://www.unq.edu.ar/images/logo_unqui.png">
    </a>
    <br><br>
    <h1>¡Felicitaciones!</h1>
    <p>La pre-inscripción ha sido completada con éxito. ¡Muchas gracias!</p>
  </div>`,
  styleUrls: ['./assets/styles.css']
})
export default class ThanksComponent {

  constructor(http, router) { 
    this.http = http;
    this.router = router;
  }

}

ThanksComponent.parameters = [
  Http, Router
]