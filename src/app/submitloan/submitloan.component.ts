import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { SubmitSuccessComponent } from './submit-success/submit-success.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-submitloan',
  standalone: true,
  imports: [SubmitSuccessComponent, RouterLink, ReactiveFormsModule,  CommonModule],
  templateUrl: './submitloan.component.html',
  styleUrl: './submitloan.component.scss'
})
export class SubmitloanComponent implements OnInit {
  checkSubmit= false;

  applicationForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];

  minDate:string | null= null;
  // minDate.setFulYear(minDate.getfulYear()-18);
  maxDate:string | null= null;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.maxDate = date.toISOString().split('T')[0]; // Get only the date part
    const date1 = new Date();
    date1.setFullYear(date1.getFullYear()-65);
    this.minDate = date1.toISOString().split('T')[0];

  }

  ngOnInit() {
    this.applicationForm = this.fb.group({
      // by adding these validators here, we can make sure that user has to put the data inside the field
      //  and then after that if we want to put the check on it we can add the conditional statements in the html file
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      middleName: ['', Validators.maxLength(255)],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      dateOfBirth: ['', [Validators.required, ageValidator(18,65)]],
      maritalStatus: ['', Validators.required],
      ssnNumber: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      loanPurpose: ['', Validators.required],
      description: [''],
      addressLine1: ['', [Validators.required, Validators.maxLength(255)]],
      addressLine2: ['', Validators.maxLength(255)],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', [Validators.required, Validators.maxLength(255)]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phoneHome: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phoneOffice: ['', [Validators.pattern('^[0-9]{10}$')]],
      phoneMobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      employerName: ['', Validators.required],
      annualSalary: ['', [Validators.required,Validators.pattern('^[0-9]*$'), Validators.min(10001)]],
      workExperienceYears: ['', Validators.required],
      workExperienceMonths: ['', Validators.required],
      designation: ['', Validators.maxLength(255)],
      employerAddressLine1: ['', [Validators.required, Validators.maxLength(255)]],
      employerAddressLine2: ['', [Validators.maxLength(255)]],
      employerCity: ['', [Validators.required, Validators.maxLength(255)]],
      employerState:['', [Validators.required, Validators.maxLength(255)]],
      employerPostalCode:['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });
  }

  submitForm() {
    this.formErrors = [];

    if (this.applicationForm.valid) {

    const workExperienceYears = parseFloat(this.applicationForm.get('workExperienceYears')?.value);
    const workExperienceMonths = parseFloat(this.applicationForm.get('workExperienceMonths')?.value);
    const totalWorkExperienceMonths = (workExperienceYears * 12) + workExperienceMonths;
    if (totalWorkExperienceMonths < 6) {
      alert('Application declined: Applicant’s work experience must be at least 6 months.');
      return;
    }

    let applicationData= this.applicationForm.value;

      console.log(applicationData)
        this.checkSubmit=true;
      this.http.post('http://localhost:8080/application', applicationData)
        .subscribe(
          (response) => {

            this.successMessage = 'Application submitted successfully!';
            this.errorMessage = null;
            this.applicationForm.reset();
          },
          (error) => {
            console.error('Error submitting application:', error);
            this.errorMessage = 'Error submitting application. Please try again.';
            this.successMessage = null;
          }
        );
    }
    else {
      console.log("there");
      this.displayErrors();
    }
  }
  displayErrors() {
    for (const control in this.applicationForm.controls) {
      if (this.applicationForm.controls[control].invalid) {
        this.formErrors.push(control);
        
      }
    }
    console.log(this.formErrors)

  }

}

// Validator function to check age between 18 and 65
export function ageValidator(minAge: number, maxAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minAge || age > maxAge) {
      return { ageInvalid: true };
    }

    return null;
  };
}

