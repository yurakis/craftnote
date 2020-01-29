import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[cnInputAutofocus]'
})
export class InputAutofocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      const inputElement = (this.element.nativeElement as HTMLInputElement | HTMLTextAreaElement);
      const valueLength = (inputElement.value || '').length;

      inputElement.focus();
      inputElement.setSelectionRange(valueLength, valueLength);
    });
  }
}
