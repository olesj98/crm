import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterializeService } from '../../services/materialize.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef;

  links = [
    { name: 'Обзор', url: '/overview' },
    { name: 'Аналитика', url: '/analitics' },
    { name: 'История', url: '/history' },
    { name: 'Добавить заказ', url: '/order' },
    { name: 'Ассортимент', url: '/categories' },
  ];
  constructor(
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    MaterializeService.initializeFloatingButoon(this.floatingRef);
  }

  logout() {
    this.authService.logout();
  }

}
