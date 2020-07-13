import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { faTint, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'gremling';
  faTint = faTint;
  faLightbulb = faLightbulb;

  constructor(private renderer:Renderer2) {}
  @ViewChild('gremlinsArea', { static: false }) d1: ElementRef;

  agua() {
    console.log('ÁGUA')
    const stage = this.renderer.createElement('div');
    const img = this.renderer.createElement('img');

    this.renderer.addClass(stage, 'stage');

    this.renderer.setStyle(stage, 'margin-top', Math.floor(Math.random() * 60)+'vh');
    this.renderer.setStyle(stage, 'margin-left', Math.floor(Math.random() * 88)+'%');

    this.renderer.addClass(img, 'gremlin');
    this.renderer.addClass(img, 'bounce');

    this.renderer.setAttribute(img, 'src', '../assets/gremlin.png');
  
    this.renderer.appendChild(stage, img);
    this.renderer.appendChild(this.d1.nativeElement, stage);
  }

  luz() {
    console.log('LUZ')
  }
}
