import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { RegistryDetailComponent } from './registry-list/registry-detail/registry-detail.component';
import { RegistryListComponent } from './registry-list/registry-list.component';
import { RegistryRoutes } from './registry.routing';
import { RegistryService } from './registry.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(RegistryRoutes)
  ],
  declarations: [RegistryListComponent, RegistryDetailComponent],
  providers: [RegistryService],
  entryComponents: [RegistryDetailComponent]
})
export class RegistryModule { }
