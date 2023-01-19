import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {

  constructor() { }
  isOpenSidebar = true;


  ngOnInit() {
    this.initStateSidebar();
  }

  initStateSidebar(): void {
    if (window.innerWidth < 768) {
      this.isOpenSidebar = false;
    }
  } 

  toggleSidebar(event: any) {
    console.log(event);
    this.isOpenSidebar = event;
  }
}
