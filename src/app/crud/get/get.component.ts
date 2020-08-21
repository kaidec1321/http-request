import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Response } from '../response';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  users: User[] = [];
  // userForm: FormGroup;

  constructor( public fb: FormBuilder,
               public crudService: CrudService,
               public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Response) => {
      if (data.data && data.data.length) {
        console.log(data);
        this.users = data.data;
      }
    });
  }

  createNewUser() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.create(result).subscribe(res => {
        console.log('User created!');
        console.log(res);
        });
        console.log(result);
        this.users.push(result);
      }
    });
  }

  deleteRow(id) {
    this.crudService.delete(id).subscribe(res => {
      let selectedUser = this.users.find(user => user.id == id);
      let index = this.users.indexOf(selectedUser);
      this.users.splice(index, 1);
      console.log('User deleted!');
    });
  }

  updateRow(id) {
    let selectedUser = this.users.find(user => user.id == id);
    let index = this.users.indexOf(selectedUser);

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '700px',
      data: selectedUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.update(id, result).subscribe(res => {
          console.log('User updated!');
          console.log(res);
        });
        // this.users.push(result);
        this.users.splice(index, 1, result);
      }
    });
  }
}
