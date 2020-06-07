import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  constructor() { }

  ngOnInit(): void {
  }

}
