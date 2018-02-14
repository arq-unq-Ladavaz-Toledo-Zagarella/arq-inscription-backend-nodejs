import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class InscriptionService {
	
	constructor(http) {
    this.http = http
    this._inscription= {}
  }

  inscriptionsTotal() {
    return this.http.get("/total-inscripciones")
  }

  getInscriptions() {
    return this.http.get("/inscripciones")
  }

  getInscriptionProgress() {
    return this.http.get("/progreso-encuesta")
  }

  inscriptionByToken(token) {
    return this.http.get("/contesto-encuesta/" + token)
  }

  addStudentToCourse(inscription) {
    return this.http.get("/inscribir-curso/" + inscription._id)
  }

  removeStudentFromCourse(inscription) {
     return this.http.get("/cancelar-inscripcion-curso/" + inscription)
  }

  create(inscription, token) {
    this.http.post("/inscripciones/" + token, JSON.stringify(inscription), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => this._inscription= response.json())
            .catch(err => console.log(err))
  }

  edit(inscription, inscriptionid) {
    this.http.post("/editar-inscripcion/" + inscriptionid, JSON.stringify(inscription), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => this._inscription= response.json())
            .catch(err => console.log(err))
  }
}

InscriptionService.parameters = [
  Http
]