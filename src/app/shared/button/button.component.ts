import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

/**
 * Button type definitions
 */
export type ButtonType = 'Default' | 'Danger' | 'Warning' | 'Success';

@Component({
  selector: 'my-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})

export class ButtonComponent implements OnInit {
  /**
   * Button text
   */
  @Input()
  text: string;
  /**
   * Button disabled status
   */
  @Input()
  disabled: boolean;
  /**
   * Button disabled status
   */
  @Input()
  type: ButtonType;
  /**
   * Button css class by type
   */
  cssClassByType: string;
  /**
   * Event emitter
   */
  @Output()
  clicked: EventEmitter<string>;
  /**
   * Constructor
   */
  constructor() {
    this.text = '';
    this.type = 'Default';
    this.clicked = new EventEmitter<string>();
  }
  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this.updateCSSClass();
  }
  /**
   * whenClicked
   */
  whenClicked() {
    this.clicked.emit('Button clicked..');
  }
  /**
   * Sets button style
   */
  updateCSSClass() {
    switch (this.type) {
      case 'Danger':
        this.cssClassByType = 'danger';
        break;
      case 'Warning':
        this.cssClassByType = 'warning';
        break;
      case 'Success':
        this.cssClassByType = 'success';
        break;
      default:
        this.cssClassByType = 'default';
    }
  }
}
