import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-grintaaa-details',
  templateUrl: './grintaaa-details.component.html',
  styleUrls: ['./grintaaa-details.component.css']
})
export class GrintaaaDetailsComponent implements OnInit {

  links: {text: string, href: string}[];

  constructor() {}

  ngOnInit(): void {
    this.links = [
      {text: 'privacy policy', href: 'privacy-policy'},
      {text: 'terms of use', href: 'terms-of-use'}
    ];
  }

}
