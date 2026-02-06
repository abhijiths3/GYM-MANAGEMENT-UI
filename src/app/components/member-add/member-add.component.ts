import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { CreateMember } from '../../models/addmember.model';

type MemberForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  joinDate: FormControl<Date>;
}>;
@Component({
  standalone: true,
  selector: 'app-member-add',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './member-add.component.html',
  styleUrl: './member-add.component.scss'
})
export class MemberAddComponent implements OnInit {

  isSubmitting = false;
  // form!: FormGroup;
  form!: MemberForm;


  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      joinDate: [new Date(), Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: CreateMember = this.form.getRawValue();

    this.isSubmitting = true;

    this.memberService.addMember(payload).subscribe({
      next: () => this.router.navigate(['/addmember']),
      error: () => (this.isSubmitting = false)
    });
  }
}
