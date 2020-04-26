import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { TagComponent } from 'app/main/configuration/tag/tag.component';
import { TagService } from 'app/main/configuration/tag/tag.service';
import { TagListComponent } from 'app/main/configuration/tag/tag-list/tag-list.component';
import { TagFormDialogComponent } from 'app/main/configuration/tag/tag-form/tag-form.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
    {
        path: 'tag',
        component: TagComponent,
        resolve: {
            tags: TagService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        TagComponent,
        TagListComponent,
        TagFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [
        TagService
    ],
    entryComponents: [
        TagFormDialogComponent
    ]
})

export class TagModule {
}
