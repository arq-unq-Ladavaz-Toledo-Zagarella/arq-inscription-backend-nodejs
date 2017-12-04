import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class AuthService {
	
	constructor(http) {
    this.http = http
  }

  accessPermitted(token) {
  	return this.http.get("/acceso-permitido/" + token)
  }
}

AuthService.parameters = [
  Http
]