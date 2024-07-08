import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';
import { HomePageModule } from './home-page/home-page.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamenFront';

 

}
