import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../user';
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

  constructor( public crudService: CrudService,
               public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Response) => {
      console.log(data);
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
          if (res != null) {
            console.log('User created!');
            console.log(res);
            this.users.push(res);
          }
        });
        console.log(result);
      }
    });
  }

  deleteRow(id) {
    this.crudService.delete(id).subscribe(res => {
      if (res != null) {
        console.log('User deleted!');
        console.log(res);
      }
      let index = this.users.findIndex(user => user.id == id);
      this.users.splice(index, 1);
    });
  }

  updateRow(id) {
    let index = this.users.findIndex(user => user.id == id);

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '700px',
      data: this.users[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.update(id, result).subscribe(res => {
          if (res != null) {
            console.log('User updated!');
            console.log(res);
          }
        });
        // this.users.push(result);
        this.users.splice(index, 1, result);
      }
    });
  }
}
