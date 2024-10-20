import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { LoaderModule } from "./Services/loader/loader.module";

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
    //   NgbModule,
      HttpClientModule,
      LoaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }