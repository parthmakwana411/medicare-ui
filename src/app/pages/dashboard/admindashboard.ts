import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';

@Component({
    selector: 'app-admin-dashboard',
    imports: [StatsWidget, RecentSalesWidget, NotificationsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-12">
                <app-recent-sales-widget />
            </div>
            <div class="col-span-12 xl:col-span-12">
                <app-notifications-widget />
            </div>
        </div>
    `
})
export class AdminDashboard {}
