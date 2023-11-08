import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../user/user.model';

import {UserService} from '../../user/user.service';
import {ToolsService} from '../../shared/tools.service';
import {HelperService} from '../../helper.service';
import {FeedbackService} from '../../shared/feedback/feedback.service';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User | any;

  private socialUser: any;
  private loggedIn: boolean | any;

  loginForm: FormGroup | any;

  constructor(private authService: AuthService,
              public angularAuth: AngularFireAuth,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private helperService: HelperService,
              private feedbackService: FeedbackService,
              private titleService: Title,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign-In');

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
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

    this.angularAuth.authState.subscribe((user: any) => {
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
    const data = {
      isSocial: false,
      username: this.loginForm.value.username,
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember_me: this.loginForm.value.remember_me
    };
    this.authService.login(data)
      .subscribe(
        (response: any) => {
          this.loggedIn = true;
          this.authService.isLogged = true;
          this.user = response.success.user;
          const message = 'Login successfully';
          this.feedbackService.feedbackReceived.next({feedback: 'success', message});
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1000);
          // window.location.href = '/home';
        }, (error) => {
          console.log(error);
          let message = error.error ? error.error : (error.error.errors ? error.error.errors : error.error.message);
          if (error.status === 500) {
            message = 'Une erreur interne s\'est produite';
          }
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        });
  }

  signInWithGoogle(): void {
    this.angularAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((responseAuth: any) => {
        console.log(responseAuth);
        this.socialUser = responseAuth.user;
        const username = this.socialUser.email.split('@')[0];  // this.toolsService.slugify(this.socialUser.displayName);
        const data = {
          isSocial: true,
          username,
          email: this.socialUser.email,
          password: this.socialUser.email
        };
        this.authService.login(data)
          .subscribe((response: any) => {
            this.userService.user = this.authService.user = response.success.user;
            const message = 'Login successfully';
            this.feedbackService.feedbackReceived.next({feedback: 'success', message});
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
          });
      });
  }

  signInWithFacebook(): void {
    this.angularAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((responseAuth: any) => {
        console.log(responseAuth);
        this.socialUser = responseAuth.user;
        const username = this.socialUser.email.split('@')[0]; // this.toolsService.slugify(this.socialUser.displayName);
        const data = {
          isSocial: true,
          username,
          email: this.socialUser.email,
          password: this.socialUser.email
        };
        this.authService.login(data)
          .subscribe((response: any) => {
            this.userService.user = this.authService.user = response.success.user;
            const message = 'Login successfully';
            this.feedbackService.feedbackReceived.next({feedback: 'success', message});
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
          });
      }, (errorSocial: any) => {
        console.log(errorSocial);
        if (errorSocial.email) {
          this.socialUser = errorSocial;
          const data = {
            isSocial: true,
            username: this.socialUser.email,
            email: this.socialUser.email,
            password: this.socialUser.email
          };
          this.authService.login(data)
            .subscribe((response: any) => {
              this.userService.user = this.authService.user = response.success.user;
              const message = 'Login successfully';
              this.feedbackService.feedbackReceived.next({feedback: 'success', message});
              setTimeout(() => {
                this.router.navigate(['home']);
              }, 1000);
            }, (error: any) => {
              const message = error.error;
              this.feedbackService.feedbackReceived.next({feedback: 'error', message});
            });
        }
      });
  }

  signInWithTwitter(): void {
    this.angularAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((responseAuth: any) => {
        console.log(responseAuth);
        this.socialUser = responseAuth.user;
        const username = responseAuth.additionalUserInfo.username;
        const data = {
          isSocial: true,
          username,
          password: username
        };
        this.authService.login(data)
          .subscribe((response: any) => {
            this.userService.user = this.authService.user = response.success.user;
            const message = 'Login successfully';
            this.feedbackService.feedbackReceived.next({feedback: 'success', message});
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
          });
      }, (errorSocial: any) => {
        console.log(errorSocial);
        if (errorSocial.email) {
          this.socialUser = errorSocial;
          const data = {
            isSocial: true,
            username: this.socialUser.email,
            email: this.socialUser.email,
            password: this.socialUser.email
          };
          this.authService.login(data)
            .subscribe((response: any) => {
              this.userService.user = this.authService.user = response.success.user;
              const message = 'Login successfully';
              this.feedbackService.feedbackReceived.next({feedback: 'success', message});
              setTimeout(() => {
                this.router.navigate(['home']);
              }, 1000);
            }, (error: any) => {
              const message = error.error;
              this.feedbackService.feedbackReceived.next({feedback: 'error', message});
            });
        }
      });
  }


  signOut(): void {
    this.angularAuth.signOut().then((response: any) => {
      console.log(response);
    });
  }
}
