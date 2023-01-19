import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  @Input() isOpenSidebar = true;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }


  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
    this.toggle.emit(this.isOpenSidebar) 
  }

}
