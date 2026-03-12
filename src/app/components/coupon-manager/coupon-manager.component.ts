import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../models/coupon.model';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-manager',
  standalone: true,
  templateUrl: './coupon-manager.component.html',
  imports:[
    CommonModule,
    FormsModule,
  ],
  styleUrls: ['coupon-manager.component.scss']
})
export class CouponManagerComponent implements OnInit {
  @ViewChild('couponGraphic') couponGraphic!: ElementRef;
  
  vibeInput: string = '';
  currentCoupon: Coupon | null = null;
  history: Coupon[] = [];
  isProcessing: boolean = false;

  constructor(private couponService: CouponService) {}

  ngOnInit() { this.loadHistory(); }

  // 1. Get data from AI
  onGenerate() {
    if (!this.vibeInput) return;
    this.isProcessing = true;
    this.couponService.generateAiDraft(this.vibeInput).subscribe({
      next: (res) => {
        this.currentCoupon = res;
        this.isProcessing = false;
      },
      error: () => this.isProcessing = false
    });
  }

  // 2. Convert the HTML/CSS Design into a real PNG Image
  async downloadCouponImage() {
    if (!this.couponGraphic) return;
    const canvas = await html2canvas(this.couponGraphic.nativeElement);
    const link = document.createElement('a');
    link.download = `GymCoupon-${this.currentCoupon?.code}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }

  // 3. Save to Database
  onSave() {
    if (this.currentCoupon) {
      this.couponService.saveCoupon(this.currentCoupon).subscribe(() => {
        this.loadHistory();
        this.currentCoupon = null;
        this.vibeInput = '';
      });
    }
  }

  loadHistory() {
    this.couponService.getHistory().subscribe(res => this.history = res);
  }
}