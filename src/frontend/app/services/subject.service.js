import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class SubjectService {
	
	constructor(http) {
    this.http = http
    this._subjects = []
    this.http.get("/materiasycursos").toPromise()
            .then(response => this._subjects.push(...response.json()))
            .catch(err => console.log(err))
  }

  subjects() {
    return this.http.get("/materiasycursos")
  }

  create(id, subject) {
    this.http.post(`/carreras/${id}/materias`, JSON.stringify(subject), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => this._subjects= response.json())
            .catch(err => console.log(err))
  }
}

SubjectService.parameters = [
  Http
]