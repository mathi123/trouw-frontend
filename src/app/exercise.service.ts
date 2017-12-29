import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ContextService } from './context.service';
import { Exercise } from './exercise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExerciseService {

  constructor(private httpClient: HttpClient, private context: ContextService) { }

  public getExercises(): Observable<Exercise[]> {
    const userId = this.context.getCurrentUser()._id;
    return this.httpClient.get<Exercise[]>(`${environment.api}/exercise?therapist=${userId}`);
  }
  public getExercise(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`${environment.api}/exercise/${id}`);
  }
  public create(exercise: Exercise): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/exercise`, exercise);
  }
  public update(exercise: Exercise): Observable<boolean> {
    return this.httpClient.put(`${environment.api}/exercise/${exercise._id}`, exercise, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
  public delete(exerciseId: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.api}/exercise/${exerciseId}`, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
}
