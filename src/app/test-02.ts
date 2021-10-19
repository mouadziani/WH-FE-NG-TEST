/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (ngModelChange)="onFieldValueChange()" />'
})
export class TextField 
{
    @Input() field = "";
    @Output() fieldChanged = new EventEmitter();

    onFieldValueChange() {
        this.fieldChanged.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2> <br/><textfield [field]="title" (fieldChanged)="onTextFieldValueChange($event)"></textfield>`
})
export class ChildComponent {
    @Output() textFieldValueChanged = new EventEmitter();

    onTextFieldValueChange(newValue) {
        this.textFieldValueChanged.emit(newValue)
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component [title]="title" (textFieldValueChanged)="title = $event"></child-component> <br/>
                    Title is: {{title}}
                </div>`
})
export class Test02Component 
{
    title: string = "test";
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};