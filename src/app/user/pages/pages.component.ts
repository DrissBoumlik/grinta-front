import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  profile: User;
  noPages = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      console.log(this.profile);
      this.noPages = (this.profile.pages && this.profile.pages.length === 0)
        && (this.profile.managed_pages && this.profile.managed_pages.length === 0)
        && (this.profile.page_invitations && this.profile.page_invitations.length === 0);
    });
    this.profile = this.profileService.profile;
    if (this.profile) {
      console.log(this.profile);
      this.noPages = (this.profile.pages && this.profile.pages.length === 0)
        && (this.profile.managed_pages && this.profile.managed_pages.length === 0)
        && (this.profile.page_invitations && this.profile.page_invitations.length === 0);
    }
  }

}
