import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { CommonModule } from '@angular/common';
 

// Pipes
@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe
  ]
})
export class PipesModule {}