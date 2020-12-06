import { Routes } from '@angular/router';
import { RegistryListComponent } from './registry-list/registry-list.component';

export const RegistryRoutes: Routes = [
  {
    path: 'registry-list',
    component: RegistryListComponent,
    data: { title: 'Cadastro', breadcrumb: 'Cadastro' }
  }
];