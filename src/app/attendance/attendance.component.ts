import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService, Attendance, NewAttendance } from '../services/attendance.service';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member.model';

@Component({
  standalone: true,
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  attendanceRecords: Attendance[] = [];
  members: Member[] = [];
  filteredMembers: Member[] = [];
  searchTerm: string = '';
  showDetails: boolean = false;
  selectedDayAttendance: Attendance[] = [];
  selectedMember: Member | null = null;
  selectedYear: number = this.currentDate.getFullYear();
  newAttendance: NewAttendance = {
    memberId: 0,
    checkInTime: '',
    checkOutTime: ''
  };

  constructor(
    private attendanceService: AttendanceService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.loadAttendance();
    this.loadMembers();
  }

  loadAttendance() {
    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      this.attendanceRecords = data;
    });
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe((data: Member[]) => {
      this.members = data;
      this.filteredMembers = data;
    });
  }

  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add previous month's days to fill the first week
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let d = new Date(startDate); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    return days;
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth() &&
           date.getFullYear() === this.currentDate.getFullYear();
  }

  hasAttendance(date: Date): boolean {
    return this.attendanceRecords.some(record =>
      new Date(record.checkInTime).toDateString() === date.toDateString()
    );
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedDayAttendance = this.attendanceRecords.filter(record =>
      new Date(record.checkInTime).toDateString() === date.toDateString()
    );
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
    this.selectedDate = null;
    this.newAttendance = { memberId: 0, checkInTime: '', checkOutTime: '' };
    this.selectedMember = null;
    this.searchTerm = '';
    this.filteredMembers = [];
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.newAttendance.memberId = member.id!;
    this.filteredMembers = [];
  }

  searchMembers() {
    if (!this.searchTerm.trim()) {
      this.filteredMembers = [];
      return;
    }
    this.filteredMembers = this.members.filter(member =>
      (member.firstName + ' ' + member.lastName).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      member.phoneNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addAttendance() {
    if (this.selectedMember && this.selectedDate) {
      const checkIn = new Date(this.selectedDate);
      checkIn.setHours(6, 0, 0, 0); // default 6 AM
      const checkOut = new Date(this.selectedDate);
      checkOut.setHours(22, 0, 0, 0); // default 10 PM

      this.newAttendance.checkInTime = checkIn.toISOString();
      this.newAttendance.checkOutTime = checkOut.toISOString();

      this.attendanceService.saveAttendance(this.newAttendance).subscribe(() => {
        this.loadAttendance();
        this.closeDetails();
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  changeYear(year: number) {
    this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
    this.selectedYear = year;
  }

  getMemberById(id: number): Member | undefined {
    return this.members.find(member => member.id === id);
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  }
}
