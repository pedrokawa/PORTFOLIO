import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled = window.scrollY > 50;
  }
}
