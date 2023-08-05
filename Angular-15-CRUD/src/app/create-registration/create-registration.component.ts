import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/register.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  public packages: string[] = ['Monthly', 'Weekly', 'Quarter', 'Yearly'];
  public importantList: string[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registrationForm.controls['height'].valueChanges.subscribe((res) => {
      // console.log('res: ', res);
      this.calculateBmi(res);
    });

    // this.id = this.route.snapshot.params['id'];

    // this.userIdToUpdate = this.activatedRoute.snapshot.params['id'];
    // this.api.getRegisteredUserId(this.userIdToUpdate).subscribe({
    //   next: (res) => {
    //     this.registrationForm.patchValue(res);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getRegisteredUserId(this.userIdToUpdate).subscribe({
          next: (res) => {
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  submit() {
    this.api
      .postRegisteredUser(this.registrationForm.value)
      .subscribe((res) => {
        this.registrationForm.reset();
      });
  }
  update() {
    this.api
      .updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        alert('Registration Updated Successfully');
        this.registrationForm.reset();
        this.router.navigate(['list']);
      });
  }

  calculateBmi(heightValue: number) {
    const weight = this.registrationForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);

    this.registrationForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue('Overweight');
        break;

      default:
        this.registrationForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }
  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    });
  }
}
