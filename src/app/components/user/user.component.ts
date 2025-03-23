import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
  username = "user"
  ngOnInit() {
    this.username = this.route.snapshot.params['username']
  }
}
