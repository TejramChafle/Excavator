import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ClientComponent } from 'app/main/configuration/client/client.component';
import { ClientService } from 'app/main/configuration/client/client.service';
import { ClientListComponent } from 'app/main/configuration/client/client-list/client-list.component';
import { ClientFormDialogComponent } from 'app/main/configuration/client/client-form/client-form.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
    {
        path: 'configuration/client',
        component: ClientComponent,
        resolve: {
            clients: ClientService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ClientComponent,
        ClientListComponent,
        ClientFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [
        ClientService
    ],
    entryComponents: [
        ClientFormDialogComponent
    ],
    exports: [
        ClientComponent
    ]
})

export class ClientModule {
}
