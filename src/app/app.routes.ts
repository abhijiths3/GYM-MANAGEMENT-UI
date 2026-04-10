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
        path: 'members',
        loadComponent: () =>
          import('./components/member-list/member-list.component')
            .then(m => m.MemberListComponent)
      },
    {
      path:'addmember',
      loadComponent: () =>
        import('./components/member-add/member-add.component')
      .then(m => m.MemberAddComponent)
    },
    {
      path: 'coupon',
      loadComponent: () => 
        import('./components/coupon-manager/coupon-manager.component')
      .then(m => m.CouponManagerComponent)
    },
        {
      path: '',
      loadComponent: () => 
        import('./components/coupon-manager/coupon-manager.component')
      .then(m => m.CouponManagerComponent)
    },
    // {
    //   path: '',
    //   loadComponent: () =>
    //     import('./components/diet-planner/diet-planner.component')
    //   .then(m => m.DietPlannerComponent)
    // }
    {
      path: 'attendance',
      loadComponent: () =>
        import('./attendance/attendance.component')
          .then(m => m.AttendanceComponent)
    },
    {
      path: 'memberships',
      loadComponent: () =>
        import('./components/membership-type/membership-type.component')
          .then(m => m.MembershipTypeComponent)
    }
    ]
    }
]
    
