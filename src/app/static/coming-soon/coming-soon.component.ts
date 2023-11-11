import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};
  constructor(private titleService: Title) { }

  readonly environment = environment;
  ngOnInit(): void {
    this.titleService.setTitle('Coming Soon');
    const launchDate = new Date( 'Jan 1, 2021 00:00:00' );
    timer(0, 1000)
      .subscribe(() => {
        const now = new Date();
        const res = (launchDate.getTime() - now.getTime()) / 1000;
        this.timeLeft.days = Math.floor(res / 86400);
        this.timeLeft.hours = Math.floor(res / 3600) % 24;
        this.timeLeft.minutes = Math.floor(res / 60) % 60;
        this.timeLeft.seconds = Math.floor(res % 60);
      });
  }
}
