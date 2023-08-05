import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/register.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  userDetails!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId).subscribe((res) => {
      this.userDetails = res;
    });
  }
}
