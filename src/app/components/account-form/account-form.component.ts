import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})

export class AccountFormComponent {
  formFields = formFields;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formFields.forEach(field => {
      this.form.addControl(field.id, this.fb.control(''));
    })
  }
}

const formFields = [{
    type: 'string',
    id: 'login',
    pattern: '[A-Za-z]',
    name: 'Логин'
  }, {
    type: 'string',
    id: 'phone',
    pattern: '\+?[0-9\s\-\(\)]+',
    name: 'Телефон'
  }, {
    type: 'date',
    id: 'createDate',
    pattern: '',
    name: 'Дата создания'
  }, {
    type: 'select',
    id: 'status',
    name: 'Статус',
  }, {
    type: 'string',
    id: 'email',
    pattern: '',
    name: 'E-mail'
  }, {
    type: 'select',
    id: 'role',
    name: 'Роль'
  }, {
    type: 'date',
    id: 'updateDate',
    pattern: '',
    name: 'Дата изменения'
  },
]
