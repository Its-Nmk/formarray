import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formarray';
  testForm: FormGroup;
  address: FormArray;

  constructor(private fb: FormBuilder) {}
 
  ngOnInit(){
     // ---Form Builder Model
     this.testForm = this.fb.group({
      cpName: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      address: this.fb.array([this.createArray()])
    })
  }


  // ========Functions=========
  get cpName() {
    return this.testForm.get('cpName');
  }
  get company() {
    return this.testForm.get('company');
  }
  get designation() {
    return this.testForm.get('designation');
  }
  get email(){
    return this.testForm.controls[0].get('email')
  }
  get addresss() {
    return this.testForm.get('address') as FormArray;
  }

  addArray() {
    this.address=this.testForm.get('address') as FormArray;
    this.address.push(this.createArray());
  }
  createArray(){
    return this.fb.group({
      category: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    });
  }
  deleteArray(index) {
    
    (<FormArray>this.testForm.get('address')).removeAt(index);
  }
}
