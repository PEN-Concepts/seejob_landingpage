import { Component } from '@angular/core';
import { ShellComponent } from './shared/shell/shell.component';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  imports: [ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'seejobrun-web';

  constructor(seo: SeoService) {
    seo.start();
  }
}
