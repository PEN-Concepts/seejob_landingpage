import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/',
      },
      {
        label: 'About Us',
        routerLink: '/about',
      },
      // {
      //   label: 'Learn',
      //   routerLink: '/learn',
      // },
      {
        label: 'Pricing',
        routerLink: '/pricing',
      },
      {
        label: 'Contact Us',
        routerLink: '/contact',
      },
    ];
  }
}
