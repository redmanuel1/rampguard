import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loadingmask',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './loadingmask.html',
  styleUrl: './loadingmask.scss'
})
export class Loadingmask {
   @Input() visible = false;
}
