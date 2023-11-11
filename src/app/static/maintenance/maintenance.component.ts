import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  constructor(private titleService: Title) { }

  readonly environment = environment;
  ngOnInit(): void {
    this.titleService.setTitle('Maintenance Mode');
  }

}
