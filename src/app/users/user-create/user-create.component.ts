import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { switchMap, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  editMode;
  form;
  companionsArray = new FormArray([]);
  user;
  newUser;
  constructor(
    private usersService: UsersService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.editMode = this.data.mode === 'edit' ? true : false;
    this.formInit();
    if (this.editMode) {
      this.usersService.getUser(this.data.userId).subscribe(user => {
        this.user = user;
        this.formInit(
          user.firstname,
          user.lastname,
          user.username,
          null,
          user.table_no,
        );
        if (user.companions.length > 0) {
          for (const companion of user.companions) {
            this.companionsArray.push(
              new FormGroup({
                coming: new FormControl(companion.coming),
                firstname: new FormControl(companion.firstname, Validators.required),
                lastname: new FormControl(companion.lastname, Validators.required),
                table_no: new FormControl(companion.table_no, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
              })
            );
          }
        }
      });
    }
    // this.formInit();
  }

  formInit(
    firstname = null,
    lastname = null,
    username = null,
    password = null,
    tableNo = null,
  ) {
    if (this.editMode) {
      this.form = this.fb.group({
      firstname: [firstname, Validators.required],
      lastname: [lastname, Validators.required],
      username: [username, Validators.required],
      table_no: [tableNo, Validators.required],
      companions: this.companionsArray
    });
    } else {
      this.form = this.fb.group({
      firstname: [firstname, Validators.required],
      lastname: [lastname, Validators.required],
      username: [username, Validators.required],
      password: [password, Validators.required],
      table_no: [tableNo, Validators.required],
      companions: this.companionsArray
    });
    }
  }

  deleteCompanion(index: number) {
    (this.form.get('companions') as FormArray).removeAt(index);
  }
  onAddCompanion() {
    (this.form.get('companions') as FormArray).push(
      new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        table_no: new FormControl(this.form.value.table_no, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  onSave() {
    if (!this.form.valid) {
      return;
    }
    if (!this.editMode) {
      this.usersService.addUser(
        this.form.value.username,
        this.form.value.password,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.table_no,
        this.form.value.companions,
      ).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.usersService.updateUser(
        this.user,
        this.data.userId,
        this.form.value.username,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.table_no,
        this.form.value.companions,
      ).subscribe(() => {
        this.dialogRef.close();
      });
    }

  }

  onDelete() {
    this.usersService.deleteUser(this.data.userId).subscribe(() => this.dialogRef.close());
  }

}
