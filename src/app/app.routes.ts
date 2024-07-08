import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './home-page/catalogo/catalogo.component';
import { PrincipalComponent } from './home-page/principal/principal.component';
import { NgModule } from '@angular/core';
import { ContactoComponent } from './home-page/contacto/contacto.component';

export const routes: Routes = [
    {path: 'principal', component: PrincipalComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'contacto', component: ContactoComponent},
    { path: 'catalogo/:idCategoria', component: CatalogoComponent },
    { path: '', redirectTo: '/principal', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }