import { Component } from '@angular/core';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  /**
   * App's title
   */
  title = 'My To-Do List';
  /**
   * Constructor
   */
  constructor() {}
}
