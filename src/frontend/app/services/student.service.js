import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class StudentService {
  
  constructor(http) {
    this.http = http    
  }
  
  studentsTotal() {
    return this.http.get("/total-estudiantes")
  }

}

StudentService.parameters = [
  Http
]