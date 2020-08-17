import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user'
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  local_data: User;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {
    console.log(data);
    this.local_data = {...data};
  }

  doAction(){
    console.log(this.local_data);
    this.dialogRef.close(this.local_data);
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
