import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule, FuseAlertDialogModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { AuthModule } from './main/authentication/auth.module';

import { AppService } from './app.service';
import { AuthGuard } from './guard/auth.guard';
import { FuseAlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog.component';
import { ConfigurationModule } from './main/configuration/configuration.module';

import { Error404Module } from './main/errors/404/error-404.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/sample',
        pathMatch : 'full',
        canActivate: [ AuthGuard ]
    },
    {
        path: 'configuration',
        loadChildren: './main/configuration/configuration.module#ConfigurationModule',
        // canActivate: [ AuthGuard ]
    },
    /* {
        path: '**',
        redirectTo: '/error-404',
        canActivate: [ AuthGuard ]
    }, */
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseAlertDialogModule,

        // App modules
        LayoutModule,
        SampleModule,
        AuthModule,

        Error404Module,

        ConfigurationModule
    ],
    entryComponents: [
        FuseAlertDialogComponent
    ],
    providers: [
        AppService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
