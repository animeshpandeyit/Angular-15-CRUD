import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  public packages: string[] = ['Monthly', 'Weekly', 'Quarter', 'Yearly'];
  public importantList: string[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  constructor(private formBuilder: FormBuilder) {}

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
      this.calculateBmi(res);
    });
  }

  submit() {
    console.log(this.registrationForm.value);
  }
  update() {}

  calculateBmi(heightValue: number) {
    const weight = this.registrationForm.value.height;
    const height = heightValue;
    const bmi = weight / (height * height);

    this.registrationForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue('under weight');
        break;

      case bmi >= 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue('normal weight');
        break;

      case bmi >= 25 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue('over weight');
        break;

      default:
        this.registrationForm.controls['bmiResult'].patchValue('Obese weight');
        break;
    }
  }
}
