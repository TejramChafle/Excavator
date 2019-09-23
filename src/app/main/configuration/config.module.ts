import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/guard/auth.guard';

const routes = [
    {
        path: 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule',
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})

export class ConfigModule {
}
