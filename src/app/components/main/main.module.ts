import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { CoreModule } from "src/app/core/core.module";
import { HeaderComponent } from "../header/header.component";
import { AccountsComponent } from "../accounts/accounts.component";
import { AccountFilterComponent } from "../accounts-filter/accounts-filter.component";


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    AccountsComponent,
    AccountFilterComponent
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule {}
