import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainviewComponent } from './pages/mainview/mainview.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PacketchartComponent } from './pages/packetchart/packetchart.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { BlockedipsComponent } from './pages/blockedips/blockedips.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpRequestsService } from './http-requests.service';
import { AuthServiceService } from './auth-service.service';
import { SocketService } from './socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './pages/support/support.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterSuccesfulSnackbarComponent } from './pages/register/register-succesful-snackbar/register-succesful-snackbar.component';
import { RegisterErrorSnackbarComponent } from './pages/register/register-error-snackbar/register-error-snackbar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MainviewComponent,
    LoginComponent,
    RegisterComponent,
    PacketchartComponent,
    BlockedipsComponent,
    SupportComponent,
    RegisterSuccesfulSnackbarComponent,
    RegisterErrorSnackbarComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ), // ToastrModule added
    NgxSpinnerModule,
    NgxChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    //{provide:HTTP_INTERCEPTORS,useClass:WebReqInterceptorService,multi:true}, 
    HttpRequestsService,
    AuthServiceService, 
    SocketService,
    RegisterErrorSnackbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
