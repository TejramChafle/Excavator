import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/authentication/login/login.module';
import { RegisterModule } from 'app/main/authentication/register/register.module';
import { ForgotPasswordModule } from 'app/main/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from 'app/main/authentication/reset-password/reset-password.module';
import { LockModule } from 'app/main/authentication/lock/lock.module';
import { MailConfirmModule } from 'app/main/authentication/mail-confirm/mail-confirm.module';

/* import { ComingSoonModule } from 'app/main/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/errors/404/error-404.module';
import { Error500Module } from 'app/main/errors/500/error-500.module';
import { InvoiceModernModule } from 'app/main/invoices/modern/modern.module';
import { InvoiceCompactModule } from 'app/main/invoices/compact/compact.module';
import { MaintenanceModule } from 'app/main/maintenance/maintenence.module';
import { PricingModule } from 'app/main/pricing/pricing.module';
import { ProfileModule } from 'app/main/profile/profile.module';
import { SearchClassicModule } from 'app/main/search/classic/search-classic.module';
import { SearchModernModule } from 'app/main/search/modern/search-modern.module';
import { FaqModule } from 'app/main/faq/faq.module';
import { KnowledgeBaseModule } from 'app/main/knowledge-base/knowledge-base.module'; */

import { AuthService } from './auth.service';

@NgModule({
    providers: [
        AuthService
    ],
    imports: [
        // Authentication
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        LockModule,
        MailConfirmModule,

        /* // Coming-soon
        ComingSoonModule,

        // Errors
        Error404Module,
        Error500Module,

        // Invoices
        InvoiceModernModule,
        InvoiceCompactModule,

        // Maintenance
        MaintenanceModule,

        // Pricing
        PricingModule,

        // Profile
        ProfileModule,

        // Search
        SearchClassicModule,
        SearchModernModule,

        // Faq
        FaqModule,

        // Knowledge base
        KnowledgeBaseModule */
    ]
})

export class AuthModule {}
