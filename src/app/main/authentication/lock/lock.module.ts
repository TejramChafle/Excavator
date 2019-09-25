import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { LockComponent } from 'app/main/authentication/lock/lock.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes = [
    {
        path     : 'auth/lock',
        component: LockComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        LockComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class LockModule
{
}
