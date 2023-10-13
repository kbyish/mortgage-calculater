import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { pairwise, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-morgage-calculator',
  templateUrl: './morgage-calculator.component.html',
  styleUrls: ['./morgage-calculator.component.scss']
})
export class MorgageCalculatorComponent implements OnInit {

  public loanTermList: any = [30, 20, 15, 10];

  public monthlyPayment: number = 0;

  public fg:any;

  mortgageCalculatorForm = new FormGroup({
    loanAmmount: new FormControl('200000', [Validators.required, Validators.min(Number.MIN_VALUE)]),
    downPaymentPercentage: new FormControl('20', [Validators.required, Validators.min(Number.MIN_VALUE), Validators.max(100)]), //Validators.pattern('^(0|[1-9][0-9]*)$'), 
    downPaymentAmount: new FormControl('', [Validators.required, Validators.min(Number.MIN_VALUE)]),
    interestRate: new FormControl('4', [Validators.required, Validators.min(Number.MIN_VALUE), Validators.max(100)]),
    loanTerm: new FormControl('', [Validators.required])


  });

  constructor(private fb: FormBuilder) {
    this.fg = this.mortgageCalculatorForm.controls;
    // this.downPaymentAmount = this.downPaymentPercentage * this.loanAmmount / 100;
  }

  ngOnInit(): void {

    //Default value for Long Term dropdown
    this.mortgageCalculatorForm.controls.loanTerm.setValue(this.loanTermList[0], { onlySelf: true });

    this.updateDownPayment(this.mortgageCalculatorForm.controls.loanAmmount.value, this.mortgageCalculatorForm.controls.downPaymentPercentage.value);
    this.updateMonthlyPayment(this.mortgageCalculatorForm.controls.loanAmmount.value,
      this.mortgageCalculatorForm.controls.downPaymentAmount.value,
        this.mortgageCalculatorForm.controls.loanTerm.value,
        this.mortgageCalculatorForm.controls.interestRate.value,
      );

    //this.downPaymentAmount = this.downPaymentPercentage * this.loanAmmount / 100;
    this.onChanges();
  }

  onChanges(): void {
    this.mortgageCalculatorForm.controls.loanAmmount.valueChanges.subscribe(val => {
      console.log('downPaymentAmount is dirty ');
      this.updateDownPayment(val, this.mortgageCalculatorForm.controls.downPaymentPercentage.value);

      this.updateMonthlyPayment(this.mortgageCalculatorForm.controls.loanAmmount.value,
        this.mortgageCalculatorForm.controls.downPaymentAmount.value,
          this.mortgageCalculatorForm.controls.loanTerm.value,
          this.mortgageCalculatorForm.controls.interestRate.value,
        );

    });


    this.mortgageCalculatorForm.controls.downPaymentPercentage.valueChanges.subscribe(val => {
      console.log('downPaymentPercentage is dirty ');
      this.updateDownPayment(this.mortgageCalculatorForm.controls.loanAmmount.value, val);
      this.updateMonthlyPayment(this.mortgageCalculatorForm.controls.loanAmmount.value,
        this.mortgageCalculatorForm.controls.downPaymentAmount.value,
          this.mortgageCalculatorForm.controls.loanTerm.value,
          this.mortgageCalculatorForm.controls.interestRate.value,
        );

    });

    this.mortgageCalculatorForm.controls.downPaymentAmount.valueChanges.subscribe(val => {
      console.log('downPaymentAmount is dirty ');
      let downPaymentPercentage = Number(val) / Number(this.mortgageCalculatorForm.controls.loanAmmount.value) * 100;
      this.mortgageCalculatorForm.controls.downPaymentPercentage.setValue(downPaymentPercentage.toString(), { emitEvent: false });

      this.updateMonthlyPayment(this.mortgageCalculatorForm.controls.loanAmmount.value,
        this.mortgageCalculatorForm.controls.downPaymentAmount.value,
          this.mortgageCalculatorForm.controls.loanTerm.value,
          this.mortgageCalculatorForm.controls.interestRate.value,
        );
    });

  }

  private updateDownPayment(loanAmmount: string | null, downPaymentPercentage: string | null) {
    let result = Number(loanAmmount) * Number(downPaymentPercentage) / 100;
    this.mortgageCalculatorForm.controls.downPaymentAmount.setValue(result.toString(), { emitEvent: false });
  }

  private updateMonthlyPayment(loanAmmount: string | null,
    downPaymentAmount: string | null,
    loanTerm: string | null,
    interestRate: string | null,
  ) {

    let pribciplePayment = Number(loanAmmount) / (Number(loanTerm) * 12);

    let principal = Number(loanAmmount) - Number(downPaymentAmount) ;

    //float monthlyInterest = annualInterest / 100 / 
    
    let annualInterest= Number(interestRate);
    let monthlyInterest = annualInterest / 100 / 12;
    let numberOfPayments = Number(loanTerm) * 12;

    console.log('annualInterest =', annualInterest);
    console.log('monthlyInterest =', monthlyInterest);
    console.log('numberOfPayments =', numberOfPayments);

    let mathPower = Math.pow(1 + monthlyInterest, numberOfPayments);

    let monthlyPayment = principal * (monthlyInterest * mathPower / (mathPower - 1));

    this.monthlyPayment = monthlyPayment;

  }

}
