import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/v1/projects'; 

  constructor(private http: HttpClient) {}

  addProject(projectData: Project): Observable<any> {
    return this.http.post(this.apiUrl, projectData).pipe(
      
    );
  }

  getProject(): Observable<any> {
      return this.http.get<any>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }

  updateProject(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur côté serveur : Code ${error.status}, Message : ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
    
     
  }
