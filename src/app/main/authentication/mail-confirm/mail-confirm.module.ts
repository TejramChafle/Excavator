import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailConfirmComponent } from 'app/main/authentication/mail-confirm/mail-confirm.component';
import { ConfGuard } from 'app/guard/conf.guard';

const routes = [
    {
        path     : 'auth/mail-confirm',
        component: MailConfirmComponent,
        canActivate: [ ConfGuard ]
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule
    ]
})
export class MailConfirmModule
{
}
