import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/v1/projects'; 

  constructor(private http: HttpClient) {}

  addProject(projectData: Project): Observable<any> {
    return this.http.post(this.apiUrl, projectData);
  }
}
