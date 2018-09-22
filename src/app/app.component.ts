import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-pwa';
  public update: boolean;

  constructor(private updates: SwUpdate) {
    this.updates.available
      .subscribe(() => {
        this.update = true;
      });
  }

  public loadUpdate() {
    this.updates.activateUpdate().then((data) => {
      console.log('UPDATE IS ACTIVATED');
      console.log(data);
      window.location.reload(true);
    });
  }
}
