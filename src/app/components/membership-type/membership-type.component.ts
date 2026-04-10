import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberShipType } from '../../models/membership-type.model';

@Component({
  selector: 'app-membership-type',
  imports: [CommonModule],
  templateUrl: './membership-type.component.html',
  styleUrl: './membership-type.component.scss'
})
export class MembershipTypeComponent {
  membershipTypes: MemberShipType[] = [
    {
      id: 1,
      name: 'Platinum',
      durationInMonths: '12',
      price: 100000,
      description: 'Top-tier membership, offering unlimited access to all clubs, premium amenities, and exclusive classes.',
      imageUrl: '/images/platinum.jpg'
    },
    {
      id: 2,
      name: 'Gold Membership',
      durationInMonths: '12',
      price: 80000,
      description: 'A premium membership that provides access to top-of-the-line cardio and strength training equipment, along with exciting studio classes.',
      imageUrl: '/images/gold.jpg'
    },
    {
      id: 3,
      name: 'Silver',
      durationInMonths: '12',
      price: 50000,
      description: 'This membership level offers access to cardio and weight training equipment, locker rooms, and personal training sessions.',
      imageUrl: '/images/silver.jpg'
    }
  ];

  selectPlan(plan: MemberShipType) {
    // TODO: Implement plan selection logic
    console.log('Selected plan:', plan);
    alert(`You selected: ${plan.name}`);
  }
}
