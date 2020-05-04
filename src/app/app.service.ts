import { Injectable } from '@angular/core';
import { FuseAlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    user: any;
    alertDialogRef: MatDialogRef<FuseAlertDialogComponent>;
    httpOptions: any;

    constructor(public _matDialog: MatDialog, private _router: Router) {
        this.initApplication();
    }

    // Initialize the application user & http header options at application level
    initApplication(): void {
        // Set user information for the logged in user at the application level if the user is logged in
        if (localStorage.getItem('auth')) {
            this.user = JSON.parse(localStorage.getItem('auth')).auth.user;
            this.user._id = JSON.parse(localStorage.getItem('auth')).auth.user._id;
            this.user.role = JSON.parse(localStorage.getItem('auth')).auth.role;
            this.user.username = JSON.parse(localStorage.getItem('auth')).auth.username;

            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
                })
            };
        }
    }



    // Handle errors/http errors from http services throughout the application
    handleError(response): void {
        // If the user token is expired, redirect user to lock page to enter the password
        if (response.status === 401 && response.error.message === 'jwt expired') {
            this._router.navigate(['auth/lock']);
        } else {
            this.handleMessage(response.error.message || response.message, response.statusText);
        }

        /* if (response.status === 500 && response.error.error.name == 'ValidationError') {
            this.handleMessage(response.error.error.message, 'Validation Error');
        } */
    }


    // Handle the alert messages from throughout the application
    handleMessage(message: string, title?: string): void {
        this.alertDialogRef = this._matDialog.open(FuseAlertDialogComponent, {
            disableClose: false,
            width: '400px'
        });

        this.alertDialogRef.componentInstance.title = title || 'Alert';
        this.alertDialogRef.componentInstance.message = message;

        this.alertDialogRef.afterClosed().subscribe(result => {
            if (result) {
                // TODO
            }
            this.alertDialogRef = null;
        });
    }
}
