import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openAdminMenu() {
    let el =  document.getElementById('admin-nav');
    el.classList.toggle('down');
    let burg = document.getElementById('burg');
    burg.classList.toggle('cat');

  }

}
