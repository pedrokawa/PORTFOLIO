import { Component } from '@angular/core';
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

}
