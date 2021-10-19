import { Injectable } from '@angular/core';
/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { formatMoney } from 'src/helpers/money.helper';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <input type="text" name="loan_amount" [(ngModel)]="loan_amount"> <br>
                    <b>Monthly Payment:</b> {{ monthly_payment }} <br/>
                    <b>Late Payment Fee: {{ late_payment }}</b> <br/>
                </div>`
})
export class Test01Component 
{
    loan_amount: number = 0;

    constructor(
        private _loanCalculatorService: LoanCalculatorService
    ) {}

    get monthly_payment(): any {
        return !this.loan_amount || this.loan_amount == 0
            ? 'N/A'
            : formatMoney(
                this._loanCalculatorService.calculateMonthlyPayment(this.loan_amount)
            );
    }

    get late_payment(): any {
        return !this.loan_amount || this.loan_amount == 0
            ? 'N/A'
            : formatMoney(
                this._loanCalculatorService.calculateLatePayment(this.loan_amount)
            );
    }
}

@Injectable()
export class LoanCalculatorService 
{
    calculateMonthlyPayment(loan_amount: number): number {
        return loan_amount * 0.02;
    }

    calculateLatePayment(loan_amount: number): number {
        return this.calculateMonthlyPayment(loan_amount) * 0.05;
    }
}


@NgModule({
    imports : [
        FormsModule,
        RouterModule.forChild([
            {
                path : '',
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component],
    providers : [LoanCalculatorService]
})
export class Test01Module {}
