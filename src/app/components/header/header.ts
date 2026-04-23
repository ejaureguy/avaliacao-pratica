import { Component } from '@angular/core';
import { GithubIconComponent } from "../icons/github-icon";

@Component({
  selector: 'app-header',
  imports: [GithubIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
