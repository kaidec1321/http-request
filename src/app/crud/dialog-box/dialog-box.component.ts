import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user'

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent {

  local_data: User;
  mode: string;
  btnText: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {
      this.local_data = {...data};
      if (data) {
        console.log("This is update!");
        this.mode = "Update Information";
        this.btnText = "Update";
      }
      else {
        console.log("This is create!");
        this.mode = "Create new user"; 
        this.btnText = "Create";
      }
    
  }

  doAction() {
    console.log(this.local_data);
    this.dialogRef.close(this.local_data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
