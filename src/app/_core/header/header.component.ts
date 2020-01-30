import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly links = [
    {path: 'auth/sign-in', label: 'Sign in'},
    {path: 'features/visualization', label: 'Features'}
  ];
}
