import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;

  constructor( public fb: FormBuilder,
               public crudService: CrudService,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data['data'];
    });
    this.userForm = this.fb.group({
      email: [''],
      first_name: [''],
      last_name: [''],
      avatar: ['']  
    })
  }

  submitForm() {
    this.crudService.create(this.userForm.value).subscribe(res => {
      console.log('User created!');
      console.log(res);
      this.users.push(res);
    });
  }

  deleteRow(id){
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === id) {
        this.users.splice(i, 1);
      }
    }
  }

  updateRow(id) {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === id) {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '500px',
          data: this.users[i]
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.users.splice(i, 1, result);
          }
        });
      }
    }
  }

}
