import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {ProfileService} from '../profile/profile.service';
import {PagesService} from './pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  profile: User;
  noPages = false;

  constructor(private profileService: ProfileService,
              private pagesService: PagesService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.pagesService.pages = profile.pages;
      this.pagesService.managedPages = profile.managed_pages;
      this.pagesService.pageInvitations = profile.page_invitations;
      this.noPages = (this.profile.pages && this.profile.pages.length === 0)
        && (this.profile.managed_pages && this.profile.managed_pages.length === 0)
        && (this.profile.page_invitations && this.profile.page_invitations.length === 0);
    });
    this.profile = this.profileService.profile;
    if (this.profile) {
      this.noPages = (this.profile.pages && this.profile.pages.length === 0)
        && (this.profile.managed_pages && this.profile.managed_pages.length === 0)
        && (this.profile.page_invitations && this.profile.page_invitations.length === 0);
    }

    this.pagesService.pagesUpdated.subscribe((updatedPages: any) => {
      console.log(updatedPages);
      this.profile.pages = updatedPages.pages;
      this.profile.managed_pages = updatedPages.managedPages;
      this.profile.page_invitations = updatedPages.pageInvitations;
    });
  }

}
