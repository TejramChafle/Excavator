import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
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
            }
        ]
    }
];
