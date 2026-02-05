import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-member-list',
  imports: [CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
members: Member[] = [];
constructor(private memberService: MemberService){}
ngOnInit(): void {
  this.memberService.getAllMembers().subscribe({
    next: (data) => {
      this.members = data;
      console.log('Members loaded:', data);
    },
    error: (e) => console.error('Error fatching members', e)
   });
}
}
