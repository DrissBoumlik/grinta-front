import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {User} from '../../user/user.model';
import {HttpClient} from '@angular/common/http';
import {isArray} from 'util';
import {Sport} from '../../user/sports/sport.model';
import {GoogleLoginProvider, AuthService as SocialService, SocialUser} from 'angularx-social-login';
import {ToolsService} from '../../shared/tools.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sports: Sport[] = [];
  imageToUpload: any = File;
  cities = [];
  private socialUser: SocialUser;
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
              private socialService: SocialService,
              private toolsService: ToolsService) { }

  ngOnInit() {
    const userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
    }

    this.userService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });

    this.http.get('./assets/data/france-cities.json').subscribe((response: any) => {
      this.cities = response;
    });

    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
      console.log(user);
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
    this.authService.register(false, this.registerForm.value.username, this.registerForm.value.firstname,
      this.registerForm.value.lastname, this.registerForm.value.email,
      this.registerForm.value.password, this.registerForm.value.password_confirmation,
      this.registerForm.value.gender,this.registerForm.value.picture,
      this.registerForm.value.cover, this.registerForm.value.sport,
      this.registerForm.value.city)
      .subscribe((response: any) => {
        console.log(response);
        this.authService.login(false, this.registerForm.value.username, this.registerForm.value.password)
          .subscribe((response2: any) => {
            this.userService.user = this.authService.user = response2.success.user;
            this.router.navigate(['home']);
          });
      }, (response: any) => {
        console.log(response);
      });
  }

  signUpWithGoogle() {
    const password = Math.random().toString(36).substring(2, 12);
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        console.log(socialUser);
        const username = this.toolsService.slugify(socialUser.name);
        this.authService.register(true, username, socialUser.firstName, socialUser.lastName,
          socialUser.email, null, null, null, socialUser.photoUrl, null, null, null)
          .subscribe((response: any) => {
            this.authService.login(true, username, null)
              .subscribe((response2: any) => {
                this.userService.user = this.authService.user = response2.success.user;
                this.router.navigate(['home']);
              });
          });
      });
  }
}
