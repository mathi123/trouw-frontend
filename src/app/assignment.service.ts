import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Assignment } from './assignment';
import { environment } from '../environments/environment';

@Injectable()
export class AssignmentService {

  constructor(private httpClient: HttpClient) { }

  public getAssignments(therapyId: string): Observable<Assignment[]> {
    return this.httpClient.get<Assignment[]>(`${environment.api}/assignment?therapy=${therapyId}`);
  }
  public getAssignment(id: string): Observable<Assignment> {
    return this.httpClient.get<Assignment>(`${environment.api}/assignment/${id}`);
  }
  public create(assignment: Assignment): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/assignment`, assignment);
  }
  public update(assignment: Assignment): Observable<boolean> {
    return this.httpClient.put(`${environment.api}/assignment/${assignment._id}`, assignment, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
  public delete(assignmentId: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.api}/assignment/${assignmentId}`, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
}
