import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      if(field.type === 'select') {
        this.form.addControl(field.id, this.fb.control(field.values?.[0].value));
      } else {
        this.form.addControl(field.id, this.fb.control('', [Validators.pattern(field.pattern ?? '')]));
      }
    })
  }
}

const formFields = [{
    type: 'string',
    id: 'login',
    pattern: /[a-zA-Z]+/,
    name: 'Логин'
  }, {
    type: 'string',
    id: 'phone',
    pattern: /\+7\(\d{3}\)\s\d{3}-\d{2}-\d{2}/,
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
    values: [
      {value: 'active', title: 'Активен'},
      {value: 'block', title: 'Заблокирован'},
    ]
  }, {
    type: 'string',
    id: 'email',
    pattern: '',
    name: 'E-mail'
  }, {
    type: 'select',
    id: 'role',
    name: 'Роль',
    values: [
      {value: 'admin', title: 'Администратор'},
      {value: 'user', title: 'Пользователь'},
    ]
  }, {
    type: 'date',
    id: 'updateDate',
    pattern: '',
    name: 'Дата изменения'
  },
]
