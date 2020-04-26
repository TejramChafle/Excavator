import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from 'app/main/configuration/contacts/contact.model';
import { ContactsService } from '../contacts.service';
import { AppService } from 'app/app.service';

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactFormDialogComponent {
    action: string;
    contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _contactsService: ContactsService,
        private _appService: AppService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Contact';
            this.contact = _data.contact;
        }
        else {
            this.dialogTitle = 'New Contact';
            this.contact = new Contact({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            _id:        [this.contact._id],
            firstname:  [this.contact.firstname],
            lastname:   [this.contact.lastname],
            // avatar:     [this.contact.avatar],
            gender:     [this.contact.gender],
            email:      [this.contact.email],
            mobile:     [this.contact.mobile],
            phone:      [this.contact.phone],
            company:    [this.contact.company],
            designation: [this.contact.designation],
            address:    [this.contact.address],
            birthday:   [this.contact.birthday],
            description: [this.contact.description],
            tag: [this.contact.tag]
        });
    }


    // Do save/update contact information on click of add/save button
    onSubmit(formData): void {
        console.log('formData', formData);

        // If the contact id exist then update and save the contact
        if (formData._id) {
            formData.updated_by = this._appService.user._id;
            formData.updated_date = new Date();
            this._contactsService.updateContact(formData).then((response) => {
                this._appService.handleMessage(response.message || 'Contact information updated successfully.', 'Success');
                this.matDialogRef.close(true);
            });
        } else {
            formData.created_by = this._appService.user._id;
            formData.updated_by = this._appService.user._id;
            formData.created_date = new Date();
            formData.updated_date = new Date();
            this._contactsService.createContact(formData).then((response) => {
                this._appService.handleMessage(response.message || 'New contact created successfully.', 'Success');
                this.matDialogRef.close(true);
            });
        }
    }
}
