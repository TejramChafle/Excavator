import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar'; */

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ContactsComponent } from 'app/main/configuration/contacts/contacts.component';
import { ContactsService } from 'app/main/configuration/contacts/contacts.service';
import { ContactListComponent } from 'app/main/configuration/contacts/contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from 'app/main/configuration/contacts/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from 'app/main/configuration/contacts/sidebars/main/main.component';
import { ContactFormDialogComponent } from 'app/main/configuration/contacts/contact-form/contact-form.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
    {
        path: 'configuration/contacts',
        component: ContactsComponent,
        resolve: {
            contacts: ContactsService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ContactsComponent,
        ContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        /* MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule, */

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [
        ContactsService
    ],
    entryComponents: [
        ContactFormDialogComponent
    ]
})

export class ContactsModule {
}
