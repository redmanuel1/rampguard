import { Component } from '@angular/core';
import { ActivitiesService } from '../services/ActivitiesService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loadingmask } from '../loadingmask/loadingmask';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Loadingmask],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
    searchTerm = '';
    activities: any[] = [];
    lastLoginTime = "";
    loading = false;
  
    constructor(private activitiesService: ActivitiesService) {}
  
    async ngOnInit() {
       this.loading = true;
       try{
      this.activities = await this.activitiesService.getTodaysTransactions();

       } finally{
       this.loading = false;

       }
    }
  
    filteredActivities() {
    const term = this.searchTerm.toLowerCase();
    return !term
      ? this.activities
      : this.activities.filter(a =>
          (a.firstName ?? '').toLowerCase().includes(term) ||
          (a.lastName ?? '').toLowerCase().includes(term) ||
          (`${a.firstName ?? ''} ${a.lastName ?? ''}`).toLowerCase().includes(term) ||
          (a.purpose ?? '').toLowerCase().includes(term) ||
          (a.login ? a.login.toLocaleString().toLowerCase() : '').includes(term) ||
          (a.logout ? a.logout.toLocaleString().toLowerCase() : '').includes(term) ||
          (Array.isArray(a.companions)
            ? a.companions.join(', ').toLowerCase()
            : (a.companions ?? '').toLowerCase()
          ).includes(term)
        );
  }

  getCount(){
    return this.activities.length
  }

 getLatestLoginTime() {
  if (!this.activities.length) return null;
  const latest = Math.max(
    ...this.activities
      .map(a => a.login ? new Date(a.login).getTime() : 0)
  );
  return new Date(latest);
}


}
