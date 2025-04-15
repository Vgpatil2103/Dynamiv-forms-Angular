import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  formFields: any[] = [];
  dynamicForm: FormGroup = this.fb.group({});
  formSubmitted = false;

  newField:any = {
    type: '',
    label: '',
    placeholder: '',
    required: false,
    options: []
  };

  optionsInput = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  updateOptions() {
    this.newField.options = this.optionsInput
      .split(',')
      .map(opt => opt.trim())
      .filter(opt => opt);
  }

  addField() {
    if (!this.newField.type) {
      alert('Please select a field type.');
      return;
    }
  
    if (['select', 'checkbox', 'radio'].includes(this.newField.type) && (!this.newField.options || this.newField.options.length === 0)) {
      alert('Please provide at least one option.');
      return;
    }
  
    const fieldName = this.newField.label.toLowerCase() + Date.now();
    const validators = this.newField.required ? [Validators.required] : [];
  
    this.formFields.push({
      ...this.newField,
      name: fieldName
    });
  
    if (this.newField.type === 'checkbox') {
      const checkboxArray = this.fb.array(
        this.newField.options.map(() => this.fb.control(false)),
        this.newField.required ? Validators.required : []
      );
      this.dynamicForm.addControl(fieldName, checkboxArray);
    } else {
      this.dynamicForm.addControl(fieldName, this.fb.control('', validators));
    }
  
    this.newField = { type: '', label: '', placeholder: '', required: false, options: [] };
    this.optionsInput = '';
  }
  

  removeField(index: number) {
    const field = this.formFields[index];
    this.dynamicForm.removeControl(field.name);
    this.formFields.splice(index, 1);
  }

  submitForm() {
    if (this.dynamicForm.valid) {
      const formValues = { ...this.dynamicForm.value };
  
      // Extract selected checkbox values
      this.formFields.forEach(field => {
        if (field.type === 'checkbox') {
          const selectedValues:any = [];
          formValues[field.name].forEach((val: boolean, idx: number) => {
            if (val) selectedValues.push(field.options[idx]);
          });
          formValues[field.name] = selectedValues;
        }
      });
  
      console.log('Form Data:', formValues);
      this.formSubmitted = true;
      setTimeout(() => (this.formSubmitted = false), 3000);
    } else {
      alert('Please fill all the mandatory fields');
      this.dynamicForm.markAllAsTouched();
    }
  }
  
}
