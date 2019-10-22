import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {User} from '../../user/user.model';
import {HttpClient} from '@angular/common/http';
import {isArray} from 'util';
import {Sport} from '../../user/sports/sport.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sports: Sport[] = [];
  imageToUpload: any = File;
  cities = [];
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
              private http: HttpClient) { }

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
    this.authService.register(this.registerForm.value.username, this.registerForm.value.firstname,
      this.registerForm.value.lastname, this.registerForm.value.email,
      this.registerForm.value.password, this.registerForm.value.password_confirmation,
      this.registerForm.value.gender,this.registerForm.value.picture,
      this.registerForm.value.cover, this.registerForm.value.sport,
      this.registerForm.value.city)
      .subscribe((response: any) => {
        console.log(response);
        this.authService.login(this.registerForm.value.username, this.registerForm.value.password)
          .subscribe((response2: any) => {
            this.userService.user = this.authService.user = response2.success.user;
            this.router.navigate(['home']);
          });
      }, (response: any) => {
        console.log(response);
      });
  }

}
