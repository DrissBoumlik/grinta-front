import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {Sport} from '../../sports/sport.model';
import {PagesService} from '../pages.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SportService} from '../../../shared/sport.service';
import {ProfileService} from '../../profile/profile.service';
import {FeedbackService} from '../../../shared/feedback/feedback.service';
import {Page} from '../page/page.model';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  user: User | any;
  sports: Sport[] = [];
  imageToUpload: any = File;
  page: Page | any;
  editMode = false;
  srcCover: string | any;
  srcImage: string | any;
  steps = {
    infos: {active: true, done: false},
    details: {active: false, done: false},
    media: {active: false, done: false},
    finish: {active: false, done: false}
  };

  CreatePageForm: any = this.fb.group({
    name: new FormControl('This is a tennis page', Validators.required),
    pagename: new FormControl('tennis_page', Validators.required),
    image: new FormControl(null),
    cover: new FormControl(null),
    type: new FormControl('private', Validators.required),
    description: new FormControl('This is a page description'),
    sport: new FormControl(1, Validators.required)
  });

  constructor(private fb: FormBuilder,
              private pagesService: PagesService,
              private userService: UserService,
              private profileService: ProfileService,
              private sportService: SportService,
              private route: ActivatedRoute,
              private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.user = this.userService.user;
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['pagename'] !== undefined;
      if (this.editMode) {
        let page = this.pagesService?.getPageByPagename(params['pagename'])?.subscribe((response: any) => {
            page = response.page;
            this.CreatePageForm.patchValue({
              name: page.name,
              pagename: page.pagename,
              image: page.image,
              cover: page.cover,
              type: page.type,
              description: page.description,
              sport: page.sport_id
            });
          });
      }
    });

    this.initForm();
  }

  initForm() {
    if (this.page) {
      this.editMode = true;
      this.CreatePageForm.patchValue({
        name: this.page.name,
        pagename: this.page.pagename,
        // image: new FormControl(null),
        // cover: new FormControl(null),
        type: this.page.type,
        description: this.page.description,
        sport: this.page.sport_id
      });
    } else {
      console.log('init');
      // Init with necessary values
    }
  }

  onFileImageChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.srcImage = reader.result;
      this.CreatePageForm.get('image').setValue({
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
      this.srcCover = reader.result;
      this.CreatePageForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onUpdatePage() {
    const page = {
      name: this.CreatePageForm.value.name,
      pagename: this.CreatePageForm.value.pagename,
      image: this.CreatePageForm.value.image,
      cover: this.CreatePageForm.value.cover,
      type: this.CreatePageForm.value.type,
      description: this.CreatePageForm.value.description,
      sport: this.CreatePageForm.value.sport
    };
    this.userService.updatePage(page)
      .subscribe((response: any) => console.log(response));
  }

  onCreatePage() {
    const page = {
      name: this.CreatePageForm.value.name,
      pagename: this.CreatePageForm.value.pagename,
      image: this.CreatePageForm.value.image,
      cover: this.CreatePageForm.value.cover,
      type: this.CreatePageForm.value.type,
      description: this.CreatePageForm.value.description,
      sport: this.CreatePageForm.value.sport
    };
    this.userService.createPage(page)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.steps = {
            infos: {active: false, done: true},
            details: {active: false, done: true},
            media: {active: true, done: true},
            finish: {active: true, done: true}
          };
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }

  goToFinish() {
    console.log(this.CreatePageForm.value);
    // validation
    if (this.editMode) {
      this.onUpdatePage();
    } else {
      this.onCreatePage();
    }

  }
}
