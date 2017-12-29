import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

export class TypedSortedDataSource<T> extends DataSource<any> {
  constructor(public list: T[], private sort: MatSort, public defaultSort: string) {
    super();
  }

  connect(): Observable<T[]> {
    const streams: any[] = [
      Observable.from(Observable.of(this.list))
    ];

    if (this.sort !== undefined) {
      streams.push(this.sort.sortChange);
    }

    return Observable.merge(...streams)
          .map((data: T[]) => this.returnData(data));
  }

  disconnect() {}

  private returnData(data: T[]): T[] {
    if (this.sort === undefined) {
      return data;
    }
    const sortColumn = this.sort.active || this.defaultSort;
    return data.sort((a, b) => ((a[sortColumn] < b[sortColumn]) ? 1 : -1) * (this.sort.direction === 'asc' ? 1 : -1));
  }
}
