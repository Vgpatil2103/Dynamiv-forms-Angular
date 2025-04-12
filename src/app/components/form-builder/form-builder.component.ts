import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {


  ngOnInit(): void {
  }
  formFields: any[] = [];
  dynamicForm: FormGroup = this.fb.group({});
  formSubmitted = false;

  newField = {
    type: '',
    label: '',
    placeholder: '',
    required: false,
    options: ['Option 1', 'Option 2']
  };

  constructor(private fb: FormBuilder) {}

  addField() {
    const fieldName = this.newField.label.toLowerCase() + Date.now();
    const validators = this.newField.required ? [Validators.required] : [];

    this.formFields.push({
      ...this.newField,
      name: fieldName
    });

    this.dynamicForm.addControl(fieldName, this.fb.control('', validators));

    this.newField = { type: '', label: '', placeholder: '', required: false, options: ['Option 1', 'Option 2'] };
  }

  removeField(index: number) {
    const field = this.formFields[index];
    this.dynamicForm.removeControl(field.name);
    this.formFields.splice(index, 1);
  }

  submitForm() {
    if (this.dynamicForm.valid) {
      console.log('Form Data:', this.dynamicForm.value);
      this.formSubmitted = true;
      setTimeout(() => (this.formSubmitted = false), 3000);
    } else {
      alert("Please fill all the mandatory fields")
      this.dynamicForm.markAllAsTouched();
    }
  }

}
