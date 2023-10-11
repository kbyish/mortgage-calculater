import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { pairwise, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-morgage-calculator',
  templateUrl: './morgage-calculator.component.html',
  styleUrls: ['./morgage-calculator.component.scss']
})
export class MorgageCalculatorComponent implements OnInit {

  mortgageCalculatorForm = new FormGroup({
    loanAmmount: new FormControl('200000'),
    downPaymentPercentage: new FormControl('20'),
    downPaymentAmount: new FormControl('')
  });

  constructor(private fb: FormBuilder) {
    // this.downPaymentAmount = this.downPaymentPercentage * this.loanAmmount / 100;
  }

  ngOnInit(): void {
    this.updateDownPayment(this.mortgageCalculatorForm.controls.loanAmmount.value , this.mortgageCalculatorForm.controls.downPaymentPercentage.value);

    //this.downPaymentAmount = this.downPaymentPercentage * this.loanAmmount / 100;
    this.onChanges();
  }

  onChanges(): void {
    this.mortgageCalculatorForm.controls.loanAmmount.valueChanges.subscribe(val => {
      console.log('downPaymentAmount is dirty ');
      this.updateDownPayment(val , this.mortgageCalculatorForm.controls.downPaymentPercentage.value);
    });


    this.mortgageCalculatorForm.controls.downPaymentPercentage.valueChanges.subscribe(val => {
      console.log('downPaymentPercentage is dirty ');
      this.updateDownPayment(this.mortgageCalculatorForm.controls.loanAmmount.value , val);      
    });

    this.mortgageCalculatorForm.controls.downPaymentAmount.valueChanges.subscribe(val => {
      console.log('downPaymentAmount is dirty ');
      let downPaymentPercentage = Number(this.mortgageCalculatorForm.controls.loanAmmount.value) / Number(val);
      this.mortgageCalculatorForm.controls.downPaymentPercentage.setValue(downPaymentPercentage.toString(), { emitEvent: false });
    });

  }

  private updateDownPayment(loanAmmount: string| null , downPaymentPercentage: string| null) {
    console.log('downPaymentAmount is dirty ');
    let result = Number(loanAmmount) / Number(downPaymentPercentage);
    this.mortgageCalculatorForm.controls.downPaymentAmount.setValue(result.toString(), { emitEvent: false }); 
  }

}
