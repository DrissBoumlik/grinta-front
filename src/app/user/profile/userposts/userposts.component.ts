import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserPostsComponent implements OnInit {
  profile: User;
  friends: User[];
  page = 1;
  firstTime = true;
  scroll = true;
  gotAllPosts = false;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.profile.posts = [];
      console.log(this.profile);
      this.getPosts();
      this.firstTime = false;
    });
  }


  getPosts() {
    this.userService.getPosts(this.page, this.profile.id).subscribe((response: any) => {
      /** spinner starts on init */
      this.spinner.show();
      this.profile.posts.push(...response.posts);
      setTimeout(() => {
        /** spinner ends after 1 second = 1000ms */
        this.spinner.hide();
      }, 1000);

      this.profileService.profile.posts = this.profile.posts;

      if (!response.posts.length) {
        this.gotAllPosts = true;
      }
    });
  }

  onScroll() {
    if (this.scroll && !this.gotAllPosts && !this.firstTime) {
      this.scroll = false;
      this.page++;
      this.getPosts();
      this.scroll = true;
    }
  }


}
