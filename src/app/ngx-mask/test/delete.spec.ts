import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxMaskModule } from '../ngx-mask.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestMaskComponent } from './utils/test-component.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { equal } from './utils/test-functions.component';

describe('Mask: Delete', () => {
    let fixture: ComponentFixture<TestMaskComponent>;
    let component: TestMaskComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestMaskComponent],
            imports: [ReactiveFormsModule, NgxMaskModule.forRoot()],
        });
        fixture = TestBed.createComponent(TestMaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('delete character in input', () => {
        component.mask = '00/00/0000';
        const debugElement: DebugElement = fixture.debugElement.query(By.css('input'));
        const inputTarget: HTMLInputElement = debugElement.nativeElement as HTMLInputElement;
        spyOnProperty(document, 'activeElement').and.returnValue(inputTarget);
        fixture.detectChanges();

        inputTarget.value = '2/34/5678';
        inputTarget.selectionStart = 1;
        inputTarget.selectionEnd = 1;
        debugElement.triggerEventHandler('keydown', { code: 'Backspace', keyCode: 8, target: inputTarget });
        debugElement.triggerEventHandler('input', { target: inputTarget });

        expect(inputTarget.value).toBe('23/45/678');
        expect(inputTarget.selectionStart).toEqual(1);
    });

    it('delete special character in input', () => {
        component.mask = '00/00/0000';
        const debugElement: DebugElement = fixture.debugElement.query(By.css('input'));
        const inputTarget: HTMLInputElement = debugElement.nativeElement as HTMLInputElement;
        spyOnProperty(document, 'activeElement').and.returnValue(inputTarget);
        fixture.detectChanges();

        inputTarget.value = '12/34/5678';
        inputTarget.selectionStart = 3;
        inputTarget.selectionEnd = 3;
        debugElement.triggerEventHandler('keydown', { code: 'Backspace', keyCode: 8, target: inputTarget });
        debugElement.triggerEventHandler('input', { target: inputTarget });

        expect(inputTarget.value).toBe('12/34/5678');
        expect(inputTarget.selectionStart).toEqual(2);
    });
    it('delete special character in secure input', () => {
        component.mask = 'XXX/X0/0000';
        component.hiddenInput = true;
        const debugElement: DebugElement = fixture.debugElement.query(By.css('input'));
        const inputTarget: HTMLInputElement = debugElement.nativeElement as HTMLInputElement;
        spyOnProperty(document, 'activeElement').and.returnValue(inputTarget);
        fixture.detectChanges();

        inputTarget.value = '123/45/6789';
        inputTarget.selectionStart = 7;
        inputTarget.selectionEnd = 7;
        debugElement.triggerEventHandler('keydown', { code: 'Backspace', keyCode: 8, target: inputTarget });
        debugElement.triggerEventHandler('input', { target: inputTarget });

        equal(inputTarget.value, '***/*5/6789', fixture);
        expect(inputTarget.selectionStart).toEqual(6);
    });
});
