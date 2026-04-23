import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TablePessoas } from "../../components/table-pessoas/table-pessoas";

@Component({
  selector: 'app-home',
  imports: [RouterLink, TablePessoas],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
