import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class InscriptionService {
	
	constructor(http) {
    this.http = http
    this._inscription= {}
  }

  create(inscription) {
    this.http.post("/inscripciones", JSON.stringify(inscription), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => this._inscription= response.json())
            .catch(err => console.log(err))
  }
}

InscriptionService.parameters = [
  Http
]