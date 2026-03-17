// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';

// // --- ANGULAR MATERIAL IMPORTS ---
// import { MatCardModule } from '@angular/material/card';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSelectModule } from '@angular/material/select';

// @Component({
//   selector: 'app-diet-planner',
//   standalone: true, // This is key for modern Angular projects
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     HttpClientModule,
//     // Add these Material modules to the imports array
//     MatCardModule,
//     MatStepperModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatAutocompleteModule,
//     MatIconModule,
//     MatProgressSpinnerModule,
//     MatSelectModule
//   ],
//   templateUrl: './diet-planner.component.html',
//   styleUrls: ['./diet-planner.component.scss']
// })
// export class DietPlannerComponent implements OnInit {
//   plannerForm = new FormGroup({
//     member: new FormControl('', Validators.required),
//     age: new FormControl('', [Validators.required, Validators.min(10)]),
//     weight: new FormControl('', Validators.required),
//     height: new FormControl('', Validators.required),
//   });

//   members = [
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
//   ];
  
//   filteredMembers!: Observable<any[]>;
//   generatedPlan: string = '';
//   bmiStatus: string = '';
//   isLoading: boolean = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.filteredMembers = this.plannerForm.get('member')!.valueChanges.pipe(
//       startWith(''),
//       map(value => this._filter(value || ''))
//     );
//   }

//   private _filter(value: string): any[] {
//     const filterValue = value.toLowerCase();
//     return this.members.filter(m => m.name.toLowerCase().includes(filterValue));
//   }

//   generatePlan() {
//     if (this.plannerForm.valid) {
//       this.isLoading = true;
//       // Replace with your actual .NET API URL
//       this.http.post('https://localhost:7001/api/diet/generate', this.plannerForm.value)
//         .subscribe({
//           next: (res: any) => {
//             this.generatedPlan = res.planContent;
//             this.bmiStatus = res.status;
//             this.isLoading = false;
//           },
//           error: () => this.isLoading = false
//         });
//     }
//   }

//   downloadPdf() {
//     // Encodes the content to safely pass it as a query string or use a POST blob request
//     const url = `https://localhost:7001/api/diet/download?content=${encodeURIComponent(this.generatedPlan)}`;
//     window.open(url, '_blank');
//   }
// }