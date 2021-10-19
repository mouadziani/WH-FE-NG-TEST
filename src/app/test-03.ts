/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { emailFormatIsValidated, passwordFormatIsValidated } from 'src/helpers/validators.helper';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [(ngModel)]="email" name="email" />
                    <br/>
                    <small *ngIf="!isEmailValidated && email">
                        The email is in correct format ( ex: ends with @a.com)
                    </small>
                    <br/>
                    <input type="password" [(ngModel)]="password" name="password" />
                    <br/>
                    <small *ngIf="!isPasswordValidated && password">
                        The password should contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
                    </small>
                    <br/>
                    <button [disabled]="!isEmailValidated && !isPasswordValidated" type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    logged_in = false;

    get isEmailValidated() {
        return this.email && emailFormatIsValidated(this.email);
    }

    get isPasswordValidated() {
        return this.password && passwordFormatIsValidated(this.password);
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};