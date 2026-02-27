import { Component, HostListener } from '@angular/core';
import { About } from '../../components/about/about';
import { Customers } from '../../components/customers/customers';
import { Works } from '../../components/works/works';

@Component({
  selector: 'app-home',
  imports: [About, Works, Customers],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
  isMobile: boolean = typeof window !== 'undefined' ? window.innerWidth <= 750 : false;

  @HostListener('window:resize')
  onResize(){
    if(typeof window !== undefined){
      this.isMobile = window.innerWidth <= 750;
    }
  }
}
