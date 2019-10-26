import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbIconModule, NbLayoutModule, NbSearchModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';

const GLOBAL_COMPONENTS = [
  HeaderComponent,
  LayoutComponent,
  FooterComponent
];

@NgModule({
  declarations: [
    ...GLOBAL_COMPONENTS,
  ],
  imports: [
    CommonModule,
    NbSelectModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbActionsModule,
    NbSearchModule
  ],
  exports: [
    ...GLOBAL_COMPONENTS
  ]
})
export class LayoutModule { }
