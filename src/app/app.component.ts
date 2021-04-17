import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('template', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  componentRef?: ComponentRef<DynamicComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    // Debugging log
    // console.log('~ loadComponent', this.cell.name, this.data);

    // Create factory for cell component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<DynamicComponent>(DynamicComponent);

    // Clear any existing views already in template
    this.viewContainerRef.clear();

    // Create component instance using factory
    this.componentRef = this.viewContainerRef.createComponent<DynamicComponent>(componentFactory);
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }
}
