import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; // URL du backend

  constructor(private http: HttpClient) {}

  addProject(projectData: any): Observable<any> {
    return this.http.post(this.apiUrl, projectData);
  }
}
