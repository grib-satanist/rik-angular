import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})

export class AccountFormComponent {
  @Output() onFilter: EventEmitter<typeof formFields>;
  formFields = formFields;
  form: FormGroup;
  isFiltered: boolean;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.onFilter = new EventEmitter<typeof formFields>();
    this.isFiltered = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formFields.forEach(field => {
      if(field.type === 'select') {
        this.form.addControl(field.id, this.fb.nonNullable.control(field.values?.[0].value));
      } else {
        this.form.addControl(field.id, this.fb.nonNullable.control('', [Validators.pattern(field.pattern ?? '')]));
      }
    })
  }

  cancelFilter(): void {

  }

  filter(): void {
    this.isFiltered = true;
    let filter = this.form.value;

    Object.keys(this.form.value).forEach(val => {
      if(!filter[val]) {
        delete filter[val];
      }
    })

    this.onFilter.emit((filter));
  }

  isValid(): boolean {
    return this.form.valid;
  }

  resetFilters(): void {
    this.form.reset();
    this.isFiltered = false;
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
