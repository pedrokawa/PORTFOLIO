import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  goto(id: string){

    if(id === 'home'){
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'});
      return;
    }

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
