import {NgModule} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './bit-class.routes';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MATERIAL_IMPORTS} from '../../shared/imports/material.imports';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MATERIAL_IMPORTS,
  ]
})
export class BitClassModule {
}

