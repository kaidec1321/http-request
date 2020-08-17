import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { GetComponent } from './get/get.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [GetComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
