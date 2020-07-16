import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../user/user.model';

import {GoogleLoginProvider, AuthService as SocialService, SocialUser} from 'angularx-social-login';
import {UserService} from '../../user/user.service';
import {ToolsService} from '../../shared/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  private socialUser: SocialUser;
  private loggedIn: boolean;

  loginForm = new FormGroup({
    username: new FormControl('a@a.a', Validators.required),
    password: new FormControl('123123123', Validators.required)
  });

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private socialService: SocialService,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    const userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
      // window.location.reload();
    }

    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
      console.log(user);
    });

    /*---------------------------------------------------------------------
      Owl Carousel
      -----------------------------------------------------------------------*/
    jQuery('.owl-carousel').each(function() {
      let jQuerycarousel = jQuery(this);
      jQuerycarousel.owlCarousel({
        items: jQuerycarousel.data("items"),
        loop: jQuerycarousel.data("loop"),
        margin: jQuerycarousel.data("margin"),
        nav: jQuerycarousel.data("nav"),
        dots: jQuerycarousel.data("dots"),
        autoplay: jQuerycarousel.data("autoplay"),
        autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
        navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
        responsiveClass: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: jQuerycarousel.data("items-mobile-sm"),
            nav: false,
            dots: true
          },
          // breakpoint from 480 up
          480: {
            items: jQuerycarousel.data("items-mobile"),
            nav: false,
            dots: true
          },
          // breakpoint from 786 up
          786: {
            items: jQuerycarousel.data("items-tab")
          },
          // breakpoint from 1023 up
          1023: {
            items: jQuerycarousel.data("items-laptop")
          },
          1199: {
            items: jQuerycarousel.data("items")
          }
        }
      });
    });
  }

  onLogin() {
    this.authService.login(false, this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((response: any) => {
        this.user = this.authService.user = response.success.user;
        this.router.navigate(['home']);
        // window.location.href = '/home';
      });
  }
  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        const username = this.toolsService.slugify(socialUser.name);
        this.authService.login(true, username, socialUser.id)
          .subscribe((response: any) => {
            this.userService.user = this.authService.user = response.success.user;
            this.router.navigate(['home']);
          });
      });
  }


  signOut(): void {
    this.socialService.signOut();
  }
}
