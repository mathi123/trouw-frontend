import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContextService } from './context.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Therapy } from './therapy';

@Injectable()
export class TherapyService {

  constructor(private httpClient: HttpClient, private context: ContextService) { }

  public getTherapys(): Observable<Therapy[]> {
    const userId = this.context.getCurrentUser()._id;
    return this.httpClient.get<Therapy[]>(`${environment.api}/therapy?therapist=${userId}`);
  }
  public getById(id: string): Observable<Therapy> {
    return this.httpClient.get<Therapy>(`${environment.api}/therapy/${id}`);
  }
  public create(therapy: Therapy): Observable<string> {
    this.clean(therapy);
    return this.httpClient.post<string>(`${environment.api}/therapy`, therapy);
  }
  public update(therapy: Therapy): Observable<boolean> {
    this.clean(therapy);
    return this.httpClient.put(`${environment.api}/therapy/${therapy._id}`, therapy, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
  public delete(therapyId: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.api}/therapy/${therapyId}`, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
  private clean(therapy: Therapy) {
    if (therapy.patient !== undefined) {
      delete therapy.patient;
    }
    if (therapy.patient !== undefined) {
      delete therapy.patient;
    }
  }
}
