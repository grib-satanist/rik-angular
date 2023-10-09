import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  accountsList: any;
  accountsData: any;
  showFiller = false;
  loading = true;
  private readonly destroy$ = new Subject<boolean>();

  constructor(private http: HttpService){}

  ngOnInit(): void {
    this.askAccounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filterAccounts(filter: any): void {
    if(!Object.keys(filter).length) {
      this.accountsData.data = this.accountsList;
      this.formatAccountList();
      return;
    }

    Object.keys(filter).forEach(key => {
      if(key === 'is_admin') {
        this.accountsData.data = this.accountsData.data.filter((item: any) => String(item[key]) === filter[key]);
      } else {
        this.accountsData.data = this.accountsData.data.filter((item: any) => item[key] === filter[key]);
      }
    })
  }

  private askAccounts(): void {
    this.http.get({
      url: 'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/'
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe((rs: AccountsData) => {
      this.accountsList = rs.data;
      this.accountsData = rs;
      this.loading = false;
      this.formatAccountList();
    });
  }

  private formatAccountList(): void {
    this.accountsData.data.forEach((item: any) => {
      Object.assign(item, this.accountsData.users.find((user: any) => user.id === item.user_id))
    });
  }
}

export interface AccountsData {
  data: AccountItem[];
  page: {
    total: number,
    current: number,
    size: number,
  };
  users: AccountUser[];
}

export interface AccountItem {
  user_id: number,
  is_admin: boolean,
  is_ecp: boolean,
  status: string,
  user: any
}

export interface AccountUser {
  id: number,
  name: string,
  email: string,
  phone: number,
  create_at: number,
  update_at: number
}

const MockData = {
  "page": {
      "total": 2,
      "current": 1,
      "size": 3
  },
  "users": [
      {
          "id": 1,
          "name": "iivanov",
          "email": "asidorov@vtb.ru",
          "phone": 79991234567,
          "create_at": 1681721695,
          "update_at": 1681724695
      },
      {
          "id": 2,
          "name": "petrov",
          "email": "petrov@vtb.ru",
          "phone": 79991234599,
          "create_at": 1681711695,
          "update_at": 1681764695
      }
  ],
  "data": [
      {
          "user_id": 2,
          "is_admin": false,
          "is_ecp": false,
          "status": "ACTIVE"
      },
      {
          "user_id": 2,
          "is_admin": true,
          "is_ecp": true,
          "status": "ACTIVE"
      },
      {
          "user_id": 1,
          "is_admin": true,
          "is_ecp": false,
          "status": "ACTIVE"
      }
  ]
}
