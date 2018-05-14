import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() gifs: Array<any>;
  page = 1;
  pageSize = 15;
  constructor() {
  }

  ngOnInit() {
  }

  pageChange(event) {
    this.page = event;
  }

}
