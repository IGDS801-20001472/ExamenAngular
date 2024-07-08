import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProducto } from '../../interfaces/IProducto';
import { CatalogoServiceService } from '../../services/catalogo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  hoverCard = 0;
 
  constructor(private router: Router){}

  irCatalogo(idCategoria: number) {
    this.router.navigate(['/catalogo', idCategoria]);
  }
}
