import { Component, OnInit } from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [fadeStateTrigger],
  host: { '[@fade]': '' }
})
export class AuthComponent implements OnInit  {

  ngOnInit() {
}

}
