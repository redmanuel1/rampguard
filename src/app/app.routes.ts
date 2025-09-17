import { Transactions } from './transactions/transactions';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Activities } from './activities/activities';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './transactions/AuthGuard';
// import { AuthGuard } from '@angular/fire/auth-guard';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '', component: Login},
  { path: 'login', component: Login },
  { path: 'transactions', component: Transactions, 
    canActivate: [authGuard],
    children:[
     
      { path: 'activities', component: Activities },
       { path: 'dashboard', component: Dashboard }
    
    ]
  },
  { path: '**', redirectTo: 'transactions/dashboard', pathMatch: 'full' }
];
