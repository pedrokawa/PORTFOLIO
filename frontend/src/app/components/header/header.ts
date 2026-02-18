import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  goto(id: string){
    const elemento = document.getElementById(id);
    if(elemento){
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'})
    }
  }
  
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled = window.scrollY > 50;
  }
}
