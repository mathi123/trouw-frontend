import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { ContextService } from './context.service';

@Injectable()
export class TaskService {
  constructor(private httpClient: HttpClient) { }

  public getTasksForExcersise(excerciseId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.api}/task?exercise=${excerciseId}`);
  }
  public getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.api}/task/${id}`);
  }
  public create(task: Task): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/task`, task);
  }
  public update(task: Task): Observable<boolean> {
    return this.httpClient.put(`${environment.api}/task/${task._id}`, task, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
  public delete(taskId: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.api}/task/${taskId}`, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }
}
