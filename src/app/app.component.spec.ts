import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ɵivyEnabled as ivyEnabled } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicModule } from './dynamic/dynamic/dynamic.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DynamicModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have ivy enabled', () => {
    expect(ivyEnabled).toBe(true);
  });

  describe('how the dyamic component works', () => {
    it('should call loadComponent() on ngOnInit', () => {
      const spy = jest.spyOn(app, 'loadComponent');

      app.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a blue background', () => {
      app.loadComponent();
      fixture.detectChanges();

      const body = document.body;//fixture.debugElement.query(By.css('body'));
      expect(body.style.background).toBe('cadetblue');
    });
  });
});
