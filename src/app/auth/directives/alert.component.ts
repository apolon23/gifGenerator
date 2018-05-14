import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../shared/services/alert.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    animations: [fadeStateTrigger],
    host: { '[@fade]': '' }
})

export class AlertComponent implements OnDestroy {
    private subscriptionReg: Subscription;
    messageReg: any;
  private subscription: Subscription;
  message: any;


    constructor(private alertService: AlertService) {
        // subscribe to alert messages
      this.subscriptionReg = alertService.getMessageReg().subscribe(messageReg => { this.messageReg = messageReg; });
      this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
    }

    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
        this.subscriptionReg.unsubscribe();
    }
}
