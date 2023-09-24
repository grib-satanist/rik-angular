import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  accountsList: AccountsData;
  showFiller = false;
  loading = true;
  private readonly destroy$ = new Subject<boolean>();

  constructor(private http: HttpService){}

  ngOnInit():void {
    this.askAccounts();
  }

  ngOnDestroy():void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private askAccounts():void {
    this.http.get({
      url: 'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/'
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe((rs: AccountsData) => {
      this.accountsList = rs;
      this.loading = false;
      this.formatAccountList();
    });
  }

  private formatAccountList():void {
    this.accountsList.data.forEach(item => {
      item.user = this.accountsList.users.find(user => user.id === item.user_id);
    })
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
