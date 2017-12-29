import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Uuid } from './Uuid';

import { environment } from '../environments/environment';

@Injectable()
export class FileService {

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('uploadFile', file, file.name);
    const extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    return this.httpClient
      .post<string>(`${environment.api}/file-upload?extension=${extension}`, formData);
  }

  public sendToServer(id, part, blob): Observable<object> {
    const headers = new HttpHeaders();
    headers.set('Content-type', 'application/octet-stream');
    const options: any = {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    };

    return this.httpClient.post(`${environment.api}/file/${id}/part/${part}`, blob, options);
    /*const url = ;
    const oReq = new XMLHttpRequest();
    oReq.open('POST', url, true);
    oReq.setRequestHeader('Content-type', 'application/octet-stream');
    oReq.onload = function (oEvent) {
        console.log(`POST on ${url} was a success!`);
    };
    oReq.send(blob);*/
  }
  public createFile(id, partsCount): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/file`, {
      id: id,
      parts: partsCount,
      format: 'audio/webm',
  });
  }
  /*public create(exercise: Exercise): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/exercise`, exercise);
  }
  public delete(exerciseId: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.api}/exercise/${exerciseId}`, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }*/
}
