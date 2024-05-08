import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() className: any = 'modal-dialog modal-md';
  @Input() closable = true;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
  @Input() isOpen = false;
  @Input() title = 'Title';
  @Output() onClose = new EventEmitter<string>();
  ngOnInit(): void {}
  closePopup() {
    this.isOpen = false;
    this.onClose.emit('Pop-up window closed');
  }
}
