import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/core/services/auth.service';

import { environment as env } from '@env/environment';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  appName = env.appName;
  title: string;
  public activeLang: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {

    this.activeLang = this.translocoService.getDefaultLang();

    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.title = title;
        const newTitle = this.translocoService.translate(this.title);

        this.titleService.setTitle(
          title ? `${newTitle} - ${env.appName}` : env.appName
        );

      });

    this.translocoService.langChanges$.subscribe(lang => {
      if (this.title) {
        const title = this.translocoService.translate(this.title);
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      }
    });

  }

}
