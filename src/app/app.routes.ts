import { Routes } from '@angular/router';
import { SaveManagerComponent } from './components/save-manager/save-manager.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { BundlesComponent } from './components/bundles/bundles.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Default route
  { path: 'save-manager', component: SaveManagerComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'bundles', component: BundlesComponent },
  { path: 'welcome', component: WelcomeComponent }
];
