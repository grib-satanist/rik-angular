import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { CoreModule } from "src/app/core/core.module";
import { HeaderComponent } from "../header/header.component";
import { AccountsComponent } from "../accounts/accounts.component";
import { AccountFormComponent } from "../account-form/account-form.component";


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    AccountsComponent,
    AccountFormComponent
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule {}
