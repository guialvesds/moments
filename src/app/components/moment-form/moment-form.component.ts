import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Moment } from 'src/app/Moments';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  mommentForm!: FormGroup

   constructor() { }

  ngOnInit(): void {

    this.mommentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl(''),
    })
  }

  get title() {
    return this.mommentForm.get('title')!;
  }
  get description() {
    return this.mommentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    this.mommentForm.patchValue({image: file});
  }

  submit() {

    if(this.title.invalid || this.description.invalid){
        return;
    }
        console.log(this.mommentForm.value);

        this.onSubmit.emit(this.mommentForm.value);
  }

}
