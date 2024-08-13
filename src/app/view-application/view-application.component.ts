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


  // calculateAge(dofb:string, submittedDate:string ){
  //   let dob = new Date(dofb);
  //   let currentDate = new Date(submittedDate);

  //   let age = currentDate.getFullYear() - dob.getFullYear();

  //   if (currentDate.getMonth() < dob.getMonth() ||
  //       (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
  //       age--;
  //   }

  //   return age;
  // }
  // @Input({required:true}) userId!:number
  // i have a option of changing thw way how i take the data from backend and display on client side
  // currently i am going witht the form method but if this dosent work, then i can make the interface ofn application form and take the values similar to the one i did in viewapps code
  // or this can be done vis a versa also.
  constructor(
    private route: ActivatedRoute,
    private viewappsService:ViewappsService ,
  ) {

  }
 
  ngOnInit(): void {
 
    this.declineRules=[];
    console.log(this.declineRules)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("abcd")
      this.viewappsService.getApplicationById(Number(id)).subscribe(data => {
      this.application = data
      console.log(this.application)
        this.declineRules = this.application.declineReason.split('.');
      });

  }
}
}
 