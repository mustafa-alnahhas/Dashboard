import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';

  constructor(public loaderService: LoaderService, private cdr: ChangeDetectorRef){

  }

  // detect change used to solve ExpressionChangedAfterItHasBeenCheckedError issue
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
