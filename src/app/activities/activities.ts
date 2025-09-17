import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivitiesService } from '../services/ActivitiesService';
import { Loadingmask } from '../loadingmask/loadingmask';


@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, FormsModule, Loadingmask],
  templateUrl: './activities.html'
})
export class Activities implements OnInit {
  searchTerm = '';
  activities: any[] = [];
  loading = false;

  constructor(private activitiesService: ActivitiesService) {}

  async ngOnInit() {
    this.loading = true;
    try{
      this.activities = await this.activitiesService.getAllTransactions();
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
}
