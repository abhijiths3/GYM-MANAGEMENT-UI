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
  styleUrls: ['./coupon-manager.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CouponManagerComponent implements OnInit {
  @ViewChild('couponGraphic') couponGraphic!: ElementRef;

  vibeInput: string = '';
  currentCoupon: Coupon | null = null;
  history: Coupon[] = [];
  isProcessing: boolean = false;
  selectedFrame: string = 'classic-red';
  selectedHistoryCoupon: any = null;

  frames = [
    { id: 'classic-red', name: 'Classic Red', class: 'classic-red' },
    { id: 'modern-dark', name: 'Modern Dark', class: 'modern-dark' },
    { id: 'onam-gold', name: 'Onam Gold', class: 'onam-gold' },
    { id: 'neon-sport', name: 'Neon Sport', class: 'neon-sport' }
  ];

  constructor(private couponService: CouponService) { }

  ngOnInit() { this.loadHistory(); }

  onGenerate() {
    if (!this.vibeInput) return;
    this.isProcessing = true;
    this.couponService.generateAiDraft(this.vibeInput).subscribe({
      next: (res) => {
        this.currentCoupon = res;
        this.currentCoupon.frameName = this.selectedFrame;
        this.isProcessing = false;
      },
      error: () => this.isProcessing = false
    });
  }

  async downloadCouponImage() {
    if (!this.couponGraphic) return;
    const canvas = await html2canvas(this.couponGraphic.nativeElement, { scale: 2, backgroundColor: null });
    const link = document.createElement('a');
    link.download = `GymCoupon-${this.currentCoupon?.code}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }

  onSave() {
    if (this.currentCoupon) {
      this.currentCoupon.frameName = this.selectedFrame; // Sync frame before save
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

  openPopup(coupon: any) { this.selectedHistoryCoupon = coupon; }
  closePopup() { this.selectedHistoryCoupon = null; }
}