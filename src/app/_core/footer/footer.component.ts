import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
}
