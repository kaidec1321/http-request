import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetComponent } from './get/get.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
{ path: 'crud', redirectTo: 'crud/get', pathMatch: 'full'},
{ path: 'crud/get', component: GetComponent },
{ path: 'crud/create', component: CreateComponent },
{ path: 'crud/update/:productId', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
