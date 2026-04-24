import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { TableMenu } from "./components/table-menu/table-menu";
import { Toast } from "./components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
