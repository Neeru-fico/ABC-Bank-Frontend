import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewappsService } from '../viewapps/viewapps.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.scss'
})
export class ViewApplicationComponent implements OnInit {
  application: any={};
  declineRules:string[] =[];
  applicantAge!:number
  applicantSalary!:number
  applicantExp!:number
  
  constructor(
    private route: ActivatedRoute,
    private viewappsService:ViewappsService ,
  ) {

  }
 
  ngOnInit(): void {
 
    // this.declineRules=[];
    // console.log(this.declineRules)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("abcd")
      this.viewappsService.getApplicationById(Number(id)).subscribe(data => {
      this.application = data
      console.log(this.application)
        // this.declineRules = this.application.declineReason.split('.');
      });

  }
}
}
 