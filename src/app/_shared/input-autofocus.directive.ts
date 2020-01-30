import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cnInputAutofocus]'
})
export class InputAutofocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    window.setTimeout(() => (this.element.nativeElement as HTMLInputElement | HTMLTextAreaElement).focus());
  }
}
