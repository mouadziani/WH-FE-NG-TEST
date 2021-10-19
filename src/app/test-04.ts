/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
*/
import { FormsModule } from '@angular/forms';
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    Enter your first name: <input type="text" name="first_name" [(ngModel)]="first_name">
                    <br/>
                    Enter your first name: <input type="text" name="first_name" [(ngModel)]="last_name">
                    <br/>
                    <p> your username is: <b>{{ username }}</b> </p>    
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    first_name: string = '';
    last_name: string = '';
    user_id: number;

    ngOnInit() {
        this.user_id = Math.floor(Math.random() * 9) + 1;
    }

    get username() {
        return this.first_name && this.last_name 
            ? this.first_name.toLowerCase() + '_' + this.last_name.toLowerCase() + '_' + this.user_id
            : ''
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};