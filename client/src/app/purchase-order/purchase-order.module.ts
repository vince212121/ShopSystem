import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneratorComponent } from './generator/generator.component';

@NgModule({
  declarations: [
    GeneratorComponent
  ],
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
})
export class PurchaseOrderModule {}
