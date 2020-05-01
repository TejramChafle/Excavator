import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { FuelResourceComponent } from 'app/main/configuration/fuel-resource/fuel-resource.component';
import { FuelResourceService } from 'app/main/configuration/fuel-resource/fuel-resource.service';
import { FuelResourceListComponent } from 'app/main/configuration/fuel-resource/fuel-resource-list/fuel-resource-list.component';
import { FuelResourceFormDialogComponent } from 'app/main/configuration/fuel-resource/fuel-resource-form/fuel-resource-form.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
    {
        path: 'fuel-resource',
        component: FuelResourceComponent,
        resolve: {
            resources: FuelResourceService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FuelResourceComponent,
        FuelResourceListComponent,
        FuelResourceFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [
        FuelResourceService
    ],
    entryComponents: [
        FuelResourceFormDialogComponent
    ],
    exports: [
        FuelResourceComponent
    ]
})

export class FuelResourceModule {
}
