import { Injectable } from '@angular/core';
import { FuseAlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    alertDialogRef: MatDialogRef<FuseAlertDialogComponent>;
    constructor(public _matDialog: MatDialog) { }



    // Handle errors/http errors from http services throughout the application
    handleError(error): void {
        console.log('error', error);
        this.handleMessage(error.error.message || error.message, error.statusText);
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
