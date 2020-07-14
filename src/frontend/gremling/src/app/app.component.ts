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
  @ViewChild('gremlinsArea', { static: false }) gremlinsArea: ElementRef;

  gremlinCounter = () => document.querySelectorAll('.gremlin-bounce').length

  agua = () => {
    if (this.gremlinCounter() <= 512) {
      let gremlin = this.renderer.createElement('div')

      this.renderer.setStyle(gremlin, 'margin-top', Math.floor(Math.random() * 60)+'vh')
      this.renderer.setStyle(gremlin, 'margin-left', Math.floor(Math.random() * 88)+'%')
      
      this.renderer.addClass(gremlin, 'gremlin-bounce')

      this.renderer.appendChild(this.gremlinsArea.nativeElement, gremlin)
    } else {
      return false
    }
  }

  luz = () => {
    let gremlins = document.querySelectorAll('.gremlin-bounce')

    if (this.gremlinCounter()) {
      this.renderer.removeChild(this.gremlinsArea.nativeElement, gremlins[this.gremlinCounter()-1])
    } else {
      return false
    }
  }
}
