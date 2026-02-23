import { Component } from '@angular/core';
import { About } from '../../components/about/about';
import { Customers } from '../../components/customers/customers';

@Component({
  selector: 'app-home',
  imports: [About, Customers],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
