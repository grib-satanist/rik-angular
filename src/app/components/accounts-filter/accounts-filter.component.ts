import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts-filter',
  templateUrl: './accounts-filter.component.html',
  styleUrls: ['./accounts-filter.component.scss']
})

export class AccountFilterComponent {
  @Output() onFilter: EventEmitter<typeof formFields>;
  formFields = formFields;
  form: FormGroup;
  filters = {} as any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.onFilter = new EventEmitter<typeof formFields>();
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
    this.filters = {};
    this.onFilter.emit(this.filters);
  }

  canCancel(): boolean {
    return !Object.keys(this.filters).length;
  }

  filter(): void {
    this.filters = this.form.value;

    Object.keys(this.form.value).forEach(val => {
      if(!this.filters[val]) {
        delete this.filters[val];
      }
    })

    this.onFilter.emit((this.filters));
  }

  isValid(): boolean {
    return this.form.valid;
  }

  resetFilters(): void {
    this.form.reset();

  }
}



const formFields = [{
    type: 'string',
    id: 'name',
    pattern: /[a-zA-Z]+/,
    name: 'Логин'
  }, {
    type: 'string',
    id: 'phone',
    pattern: /\+7\(\d{3}\)\s\d{3}-\d{2}-\d{2}/,
    name: 'Телефон'
  }, {
    type: 'date',
    id: 'create_at',
    pattern: '',
    name: 'Дата создания'
  }, {
    type: 'select',
    id: 'status',
    name: 'Статус',
    values: [
      {value: 'ACTIVE', title: 'Активен'},
      {value: 'BLOCKED', title: 'Заблокирован'},
    ]
  }, {
    type: 'string',
    id: 'email',
    pattern: '',
    name: 'E-mail'
  }, {
    type: 'select',
    id: 'is_admin',
    name: 'Роль',
    values: [
      {value: 'true', title: 'Администратор'},
      {value: 'false', title: 'Пользователь'},
    ]
  }, {
    type: 'date',
    id: 'update_at',
    pattern: '',
    name: 'Дата изменения'
  },
]
