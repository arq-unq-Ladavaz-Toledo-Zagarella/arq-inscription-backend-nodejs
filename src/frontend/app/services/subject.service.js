import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class SubjectService {
	
	constructor(http) {
    this.http = http
    this._subjects = [{name: "Objetos 3"}, {name: "Orga"}, {name: "Mate 1"}, {name: "Mate 2"},]
    /*
    this.http.get("/materias").toPromise()
            .then(response => this._subjects.push(...response.json()))
            .catch(err => console.log(err))
  	*/
  }

  get subjects() {
    return this._subjects
  }
}

SubjectService.parameters = [
  Http
]