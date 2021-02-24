import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
