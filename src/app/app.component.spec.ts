import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ɵivyEnabled as ivyEnabled } from '@angular/core';

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

  // source: https://github.com/nrwl/nx/issues/2752
  // Uncomment line in jest.config.js to enable ivy on tests for jest
  it('should have ivy enabled', () => {
    // Checks to see if ivy is enabled for this component (which would mean it's enabled for this test)
    expect(ivyEnabled).toBe(true);
  });

  describe('how the dyamic component works', () => {
    it('should call loadComponent() on ngOnInit', () => {
      const spy = spyOn(app, 'loadComponent');

      app.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a blue background', () => {
      app.loadComponent();
      fixture.detectChanges();

      const body = document.body;

      expect(body.style.background).toBe('cadetblue');
    });
  });
});
