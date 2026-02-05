import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        // path: '',
        // loadComponent: () =>
        //     import('./components/member-list/member-list.component')
        // .then(m => m.MemberListComponent)

    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/member-list/member-list.component')
            .then(m => m.MemberListComponent)
      }]
    }
]
    
