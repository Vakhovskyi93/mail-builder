import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import printIcon from 'src/app/utils/icons-registry';
import { DomSanitizer } from '@angular/platform-browser';

// material modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { HeaderComponent } from './header/header.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { InputComponent } from './input/input.component';

import { LogoComponent } from './logo/logo.component';
import { EditClickComponent } from './edit-click/edit-click.component';
import { ModalComponent } from './modal/modal.component';
import { SendMailModalComponent } from './send-mail-modal/send-mail-modal.component';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  ReactiveFormsModule,
  FormsModule,
];
const components = [
  EditClickComponent,
  ModalComponent,
  LogoComponent,
  HeaderComponent,
  ActionButtonComponent,
  InputComponent,
  SendMailModalComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...materialModules],
  exports: [...components],
})
export class UiComponentsModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    printIcon(this.matIconRegistry, this.domSanitizer);
  }
}
