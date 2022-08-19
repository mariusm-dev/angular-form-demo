// agnular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// primeng
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';


//local
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogsComponent } from './components/logs/logs.component';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        SignUpComponent,
        LogsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        ProgressSpinnerModule
    ],
    providers: [MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
