import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming',
  templateUrl: './coming.component.html',
  styleUrls: ['./coming.component.scss']
})
export class ComingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  homePage() {
    this.router.navigate(['/']);
  }
}
