import { Component } from '@angular/core';
import { currentYear } from '../../utils/currentYear';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  anoAtual: number = currentYear() - 2011;

}
