import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DependenciesModule } from '../shared/dependencies.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from './pipes/phone.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DependenciesModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PhonePipe
  ],
  exports: [
    CommonModule,
    DependenciesModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PhonePipe
  ],
  providers: [AsyncPipe]
})
export class CoreModule {}
