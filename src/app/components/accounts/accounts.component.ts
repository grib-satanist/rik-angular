import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountItem, AccountsData } from '../main/main.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() accountsList: AccountsData;

  displayedColumns: string[] = ['action', 'login', 'email', 'phone', 'role', 'updateDate', 'createDate', 'status', 'ecp'];
  dataSource: MatTableDataSource<AccountItem>;

  constructor(){}
}

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 из ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
}

export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Отображать:';
  paginatorIntl.nextPageLabel = 'Следующая страница';
  paginatorIntl.previousPageLabel = 'Предыдущая страница';
  paginatorIntl.lastPageLabel = 'Последняя страница';
  paginatorIntl.firstPageLabel = 'Первая страница';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
