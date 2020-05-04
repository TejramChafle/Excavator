import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContactsModule } from './contacts/contacts.module';
import { EmployeesModule } from './employees/employees.module';
import { TagModule } from './tag/tag.module';
import { FuelResourceModule } from './fuel-resource/fuel-resource.module';
import { ClientModule } from './client/client.module';

@NgModule({
    imports: [
        FuseSharedModule,

        ContactsModule,
        EmployeesModule,
        TagModule,
        FuelResourceModule,
        ClientModule
    ]
})

export class ConfigurationModule {
}
