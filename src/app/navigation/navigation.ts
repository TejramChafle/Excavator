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
                url      : '/contacts'
            },
            {
                id       : 'employees',
                title    : 'Employees',
                type     : 'item',
                icon     : 'people',
                url      : '/employees'
            },
            {
                id       : 'tag',
                title    : 'Tags',
                type     : 'item',
                icon     : 'label',
                url      : '/tag'
            },
            {
                id       : 'fuel-resource',
                title    : 'Fuel Resource',
                type     : 'item',
                icon     : 'local_gas_station',
                url      : '/fuel-resource'
            }
        ]
    }
];
