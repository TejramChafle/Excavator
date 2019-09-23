import { Injectable } from '@angular/core';
import { FuseAlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    user: any;
    alertDialogRef: MatDialogRef<FuseAlertDialogComponent>;
    constructor(public _matDialog: MatDialog, private _router: Router) {
        // Set user information for the logged in user at the application level if the user is logged in
        if (localStorage.getItem('auth')) {
            this.user = JSON.parse(localStorage.getItem('auth')).user;
        }
    }



    // Handle errors/http errors from http services throughout the application
    handleError(errorResponse): void {
        console.log('errorResponse', errorResponse);
        // If the user token is expired, redirect user to lock page to enter the password
        if (errorResponse.status === 401 && errorResponse.error.message === 'jwt expired') {
            this._router.navigate(['auth/lock']);
        } else {
            this.handleMessage(errorResponse.error.message || errorResponse.message, errorResponse.statusText);
        }
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
