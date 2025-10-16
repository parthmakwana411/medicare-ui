import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { MedicineCategory } from '@/pages/dashboard/medicine.category';
import { Cart } from '@/pages/dashboard/cart';
import { OrdersListComponent } from '@/pages/dashboard/orders';
import { AccountComponent } from '@/pages/dashboard/account';
import { authGuard } from '@/pages/auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'category', component: MedicineCategory },
            { path: 'cart', component: Cart, canActivate: [authGuard] },           // protected
            { path: 'orders', component: OrdersListComponent, canActivate: [authGuard] }, // protected
            { path: 'account', component: AccountComponent, canActivate: [authGuard] },   // protected
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') }, // login/register pages
    { path: '**', redirectTo: '/notfound' } // wildcard route
];

