/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDishComponent } from './add-dish.component';

describe('AddDishComponent', () => {
  let component: AddDishComponent;
  let fixture: ComponentFixture<AddDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
