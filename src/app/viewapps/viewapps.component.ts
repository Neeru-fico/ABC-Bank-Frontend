import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewappsService, Application } from './viewapps.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewapps',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './viewapps.component.html',
  styleUrl: './viewapps.component.scss'
})
export class ViewappsComponent implements OnInit {
  applications: Application[] = [];

  constructor(private viewappsService: ViewappsService) { }


  ngOnInit(): void {
    this.viewappsService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }
}
