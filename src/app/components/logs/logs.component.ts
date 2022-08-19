import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user.model';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent {

    @Input() logs: UserResponse[] = [];

    constructor() { }

}
