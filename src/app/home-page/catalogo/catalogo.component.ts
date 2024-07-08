import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProducto } from '../../interfaces/IProducto';
import { CatalogoServiceService } from '../../services/catalogo-service.service';
import { FormsModule } from '@angular/forms';
import { ICategoria } from '../../interfaces/ICatergoria';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
 
  products: IProducto[] = [];

  categorias: ICategoria[] = [];

  isResultLoaded = false;
  isUpdateFormActive = false;

  nombreProducto: string = "";

  idCategoria: number | null = null;



  constructor( private route: ActivatedRoute, private _tareaService: CatalogoServiceService){

    

    this.searchProducto();
    this.obtenerCategorias();
    this.route.paramMap.subscribe(params => {
      const id = params.get('idCategoria');
      if (id) {
        this.idCategoria = +id;
        
      } 

      if (this.idCategoria === 1){
        this.toggleCheckbox(this.categorias[0]);
      }
    });
   

  }

  obtenerProductos(){
    this._tareaService.getList().subscribe({
    
      next:(data) => {
        this.products = data;
        this.isResultLoaded = true;
        
      }, 
      error:(e) =>{console.log(e)}
    
    });
  }

  searchProducto(){
    if (this.nombreProducto.trim() === '') {
      this.obtenerProductos();
    } else {
      this._tareaService.search(this.nombreProducto).subscribe({
        next: (data) => {
          this.products = data;
          this.isResultLoaded = true;
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }


  obtenerCategorias() {
    this.categorias = [
      { idCategoria: 1, nombreCategoria: 'Mundo Abierto', selected: false },
      { idCategoria: 2, nombreCategoria: 'Aventura', selected: false },
      { idCategoria: 3, nombreCategoria: 'Plataforma', selected: false },
      { idCategoria: 4, nombreCategoria: 'Retro', selected: false },
      { idCategoria: 5, nombreCategoria: 'Disparos', selected: false }
      ];
  }


  toggleCheckbox(categoria: ICategoria) {
    // Desmarcar todos los demás checkboxes
    this.categorias.forEach(c => {
      if (c.idCategoria !== categoria.idCategoria) {
        c.selected = false;
      }
    });

    // Filtrar productos según la categoría seleccionada
    this.filterProductos();
  }
  

  filterProductos() {
    let productosFiltrados = this.products;
  
    // Filtrar por nombre del producto
    if (this.nombreProducto.trim() !== '') {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombreProducto.toLowerCase().includes(this.nombreProducto.trim().toLowerCase())
      );
    }
  
    // Filtrar por categorías seleccionadas
    const categoriasSeleccionadas = this.categorias.filter(categoria => categoria.selected).map(categoria => categoria.idCategoria);
    if (categoriasSeleccionadas.length > 0) {
      productosFiltrados = productosFiltrados.filter(producto =>
        categoriasSeleccionadas.includes(producto.idCategoria)
      );
    }
  
    // Si no hay categorías seleccionadas, mostrar todos los productos
    if (categoriasSeleccionadas.length === 0 && this.nombreProducto.trim() === '') {
      this.obtenerProductos();
    } else {
      this.products = productosFiltrados;
    }
  }
  
}
