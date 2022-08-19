import { Component } from '@angular/core';
import { UserResponse } from './models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-form-demo';

    public logs: UserResponse[] = [];

    public addUserResponseToLogs(user: UserResponse) {
        this.logs.push(user);
    }

}
