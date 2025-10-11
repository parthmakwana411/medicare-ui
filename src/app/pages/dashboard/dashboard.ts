import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BottomDock } from "./components/bottom.dock";

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, NotificationsWidget, BottomDock],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-notifications-widget />
            </div>
            <div class="col-span-12 xl:col-span-6 block lg:hidden">
                <app-bottom-dock />
            </div>
        </div>
    `
})
export class Dashboard {}
