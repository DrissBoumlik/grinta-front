import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../user/user.model';

import {GoogleLoginProvider, AuthService as SocialService, SocialUser} from 'angularx-social-login';
import {UserService} from '../../user/user.service';
import {ToolsService} from '../../shared/tools.service';
import {HelperService} from '../../helper.service';
import {FeedbackService} from '../../shared/feedback/feedback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  private socialUser: SocialUser;
  private loggedIn: boolean;

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private socialService: SocialService,
              private helperService: HelperService,
              private feedbackService: FeedbackService,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(('a@a.a'), Validators.required),
      password: new FormControl('123123123', Validators.required),
      remember_me: new FormControl(true)
    });

    // this.helperService.getRandomUser().subscribe(
    //   (response: any) => {
    //     const user = response.data[0];
    //     this.loginForm.get('username').setValue(user.email);
    //   }
    // );

    const userLogged = localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
      // window.location.reload();
    }

    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
    });

    /*---------------------------------------------------------------------
      Owl Carousel
      -----------------------------------------------------------------------*/
    jQuery('.owl-carousel').each(function() {
      const jQuerycarousel = (jQuery(this) as any);
      jQuerycarousel.owlCarousel({
        items: jQuerycarousel.data('items'),
        loop: jQuerycarousel.data('loop'),
        margin: jQuerycarousel.data('margin'),
        nav: jQuerycarousel.data('nav'),
        dots: jQuerycarousel.data('dots'),
        autoplay: jQuerycarousel.data('autoplay'),
        autoplayTimeout: jQuerycarousel.data('autoplay-timeout'),
        navText: ['<i class=\'fa fa-angle-left fa-2x\'></i>', '<i class=\'fa fa-angle-right fa-2x\'></i>'],
        responsiveClass: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: jQuerycarousel.data('items-mobile-sm'),
            nav: false,
            dots: true
          },
          // breakpoint from 480 up
          480: {
            items: jQuerycarousel.data('items-mobile'),
            nav: false,
            dots: true
          },
          // breakpoint from 786 up
          786: {
            items: jQuerycarousel.data('items-tab')
          },
          // breakpoint from 1023 up
          1023: {
            items: jQuerycarousel.data('items-laptop')
          },
          1199: {
            items: jQuerycarousel.data('items')
          }
        }
      });
    });
  }

  onLogin() {
    const data =  {
      isSocial: false,
      username: this.loginForm.value.username,
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember_me: this.loginForm.value.remember_me
    };
    this.authService.login(data)
      .subscribe(
        (response: any) => {
        this.user = response.success.user;
        this.router.navigate(['home']);
        // window.location.href = '/home';
      }, (error) => {
          console.log(error);
          const message = error.error ? error.error : (error.error.errors ? error.error.errors : error.error.message);
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        });
  }
  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        const username = this.toolsService.slugify(socialUser.name);
        const data =  {
          isSocial: true,
          username,
          email: socialUser.id
        };
        this.authService.login(data)
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
