import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Dashboard',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Dashboard',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'home',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
    {
        id       : 'configuration',
        title    : 'Configuration',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'contacts',
                title    : 'Contacts',
                type     : 'item',
                icon     : 'contacts',
                url      : '/configuration/contacts'
            },
            {
                id       : 'employees',
                title    : 'Employees',
                type     : 'item',
                icon     : 'people',
                url      : '/configuration/employees'
            },
            {
                id       : 'tag',
                title    : 'Tags',
                type     : 'item',
                icon     : 'label',
                url      : '/configuration/tag'
            },
            {
                id       : 'fuel-resource',
                title    : 'Fuel Resource',
                type     : 'item',
                icon     : 'local_gas_station',
                url      : '/configuration/fuel-resource'
            },
            {
                id       : 'client',
                title    : 'Client',
                type     : 'item',
                icon     : 'person',
                url      : '/configuration/client'
            }
        ]
    }
];
