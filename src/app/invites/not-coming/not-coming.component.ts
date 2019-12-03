import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-coming',
  templateUrl: './not-coming.component.html',
  styleUrls: ['./not-coming.component.scss']
})
export class NotComingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  homePage() {
    this.router.navigate(['/']);
  }
}
