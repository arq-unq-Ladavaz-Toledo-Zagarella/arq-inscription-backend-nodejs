import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class CourseService {
	
	constructor(http) {
    this.http = http
    this._courses = []
    this.http.get("/cursos").toPromise()
            .then(response => this._courses.push(...response.json()))
            .catch(err => console.log(err))      
  }
  

  get courses() {
    return this._courses
  }


  create(id, course) {
    this.http.post(`/materias/${id}/cursos`, JSON.stringify(course), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => this._courses = response.json())
            .catch(err => console.log(err))
  }
}

CourseService.parameters = [
  Http
]