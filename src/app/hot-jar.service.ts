import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class HotJarService {
  private imported = false;

  constructor() { }

  public import() {
    if (this.imported) {
      return;
    }
    if (environment.production) {
      const link = 'https://static.hotjar.com/c/hotjar-';
      const suffix = '.js?sv=';
      this.initHotjar(window, document, link, suffix, undefined, undefined);
    }
    this.imported = true;
  }
  private initHotjar(h, o, t, j, a, r) {
    h.hj = h.hj || function(){
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = {hjid: 747022, hjsv: 6};
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  }
}
