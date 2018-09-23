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
  public deferredPrompt;

  constructor(private updates: SwUpdate) {
    this.updates.available
      .subscribe(() => {
        this.update = true;
      });

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log('beforeinstallprompt');
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  }

  public showConfirm() {
    console.log(this.deferredPrompt);
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
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
