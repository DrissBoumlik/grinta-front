import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Sport} from '../../user/sports/sport.model';
import {ToolsService} from '../../shared/tools.service';
import {SportService} from '../../shared/sport.service';
import {FeedbackService} from '../../shared/feedback/feedback.service';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sports: Sport[] = [];
  imageToUpload: any = File;
  cities = [];
  private loggedIn: boolean;
  registerForm = new FormGroup({
    username: new FormControl('jd', Validators.required),
    firstname: new FormControl('John', Validators.required),
    lastname: new FormControl('Doe', Validators.required),
    gender: new FormControl('male', Validators.required),
    city: new FormControl('male', Validators.required),
    picture: new FormControl(null),
    cover: new FormControl(null),
    email: new FormControl('jd@grintaaa.com', Validators.required),
    password: new FormControl('123123123', Validators.required),
    password_confirmation: new FormControl('123123123', Validators.required),
    sport: new FormControl(null, Validators.required)
  });
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private http: HttpClient,
              private sportService: SportService,
              private toolsService: ToolsService,
              private titleService: Title,
              private feedbackService: FeedbackService) { }
  readonly environment = environment;

  ngOnInit() {
    this.titleService.setTitle('Sign-Up');

    const userLogged = localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
    }

    // this.sportService.getSports().subscribe((response: any) => this.sports = response.sports);

    // this.toolsService.getCities().subscribe((response: any) => this.cities = response);

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

  onFilePictureChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.registerForm.get('picture').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onFileCoverChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.registerForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onRegister() {
    const registerData = {
      isSocial: false,
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.password_confirmation,
      gender: this.registerForm.value.gender,
      picture: this.registerForm.value.picture,
      cover: this.registerForm.value.cover,
      sport: this.registerForm.value.sport,
      city: this.registerForm.value.city
    };
    this.authService.register(registerData)
      .subscribe((response: any) => {
        console.log(response);
        const data = {
          isSocial: false,
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        };
        this.authService.login(data)
          .subscribe((response2: any) => {
            this.userService.user = this.authService.user = response2.success.user;
            this.router.navigate(['home']);
          });
      }, (error) => {
        // const error = response.error.error;
        // const messages = [];
        // Object.entries(error).forEach((item: any) => {
        //   messages.push(item[1].flat()[0]);
        // });
        console.log(error);
        const message = error.error ? error.error : (error.error.errors ? error.error.errors : error.error.message);
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }


}
