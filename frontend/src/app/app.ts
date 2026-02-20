import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Home } from "./pages/home/home";
import { About } from "./components/about/about";
import { Customers } from "./components/customers/customers";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Home, About, Customers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
