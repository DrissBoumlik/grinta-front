import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {User} from '../../user.model';
import {Page} from '../../pages/page/page.model';
import {PagesService} from '../../pages/pages.service';

@Component({
  selector: 'app-profile-likes',
  templateUrl: './profile-likes.component.html',
  styleUrls: ['./profile-likes.component.css']
})
export class ProfileLikesComponent implements OnInit {
  profile: User;
  pages: Page[] = [];
  type = 'pages';
  emptyList = false;
  urls = {
    pages: () => {
      this.pages = this.profile.pages;
      this.emptyList = !this.pages.length;
    },
    adminPages: () => {
      this.pages = this.profile.adminedPages;
      this.emptyList = !this.pages.length;
    },
    moderatedPages: () => {
      this.pages = this.profile.moderatedPages;
      this.emptyList = !this.pages.length;
    },
  };
  constructor(private profileService: ProfileService,
              private pagesService: PagesService) {}

  ngOnInit() {
    this.pages = [];
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.urls[this.type]();
    });
    this.profile = this.profileService.profile;
    this.urls[this.type]();
  }

  getPages(type: string) {
    this.pages = [];
    this.type = type;
    this.urls[type]();
  }

  onUnlike(page: Page) {
    console.clear();
    console.log('unliked');
    this.pagesService.unlikePage(page).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
