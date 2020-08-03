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

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  user: User;
  sports: Sport[] = [];
  imageToUpload: any = File;
  editMode = false;
  steps = {
    infos: {active: true, done: false},
    details: {active: false, done: false},
    media: {active: false, done: false},
    finish: {active: false, done: false},
  };

  CreatePageForm = this.fb.group({
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
    this.user = this.userService.user;
  }

  ngOnInit() {
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });
    this.route.params.subscribe((params: Params) => {
      this.editMode = params.pagename !== undefined;
      if (this.editMode) {
        let page = this.pagesService.getPageByPagename(params.pagename)
          .subscribe((response: any) => {
            page = response.page;
            this.CreatePageForm.patchValue({
              name: page.name,
              pagename: page.pagename,
              image: page.image,
              cover: page.cover,
              type: page.type,
              description: page.description,
              sport: page.sport_id,
            });
          });
      }
    });

    // this.initForm();
  }

  initForm() {
    let e;
    let t;
    let a;
    let n;
    let o = 1;
    const r = $('fieldset').length;

    function i(e) {
      let t: any = parseFloat(String(100 / r)) * e;
      t = t.toFixed();
      $('.progress-bar').css('width', t + '%');
    }

    i(o);
    $('.next').click(function() {
      e = $(this).parent();
      t = $(this).parent().next();
      const topTabListItem = $('#top-tab-list li');
      const fieldset = $('fieldset');
      topTabListItem.eq(fieldset.index(t)).addClass('active');
      topTabListItem.eq(fieldset.index(e)).addClass('done');
      t.show();
      e.animate({
        opacity: 0
      }, {
        step: (a) => {
          n = 1 - a;
          e.css({
            display: 'none',
            position: 'relative'
          });
          t.css({
            opacity: n
          });
        },
        duration: 500
      });
      i(++o);
    });
    $('.previous').click(function () {
      e = $(this).parent();
      a = $(this).parent().prev();
      const topTabListItem = $('#top-tab-list li');
      const fieldset = $('fieldset');
      topTabListItem.eq(fieldset.index(e)).removeClass('active');
      topTabListItem.eq(fieldset.index(a)).removeClass('done');
      a.show();
      e.animate({
        opacity: 0
      }, {
        step: (t) => {
          n = 1 - t, e.css({
            display: 'none',
            position: 'relative'
          });
          a.css({
            opacity: n
          });
        },
        duration: 500
      });
      i(--o);
    });
    $('.submit').click(() => {
      return !1;
    });
  }

  onFileImageChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
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
      this.CreatePageForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onUpdatePage() {
    this.userService.updatePage(this.CreatePageForm.value.name, this.CreatePageForm.value.pagename,
      this.CreatePageForm.value.image, this.CreatePageForm.value.cover,
      this.CreatePageForm.value.type, this.CreatePageForm.value.description, this.CreatePageForm.value.sport)
      .subscribe((response: any) => console.log(response));
  }

  onCreatePage() {
    // console.log('submitted');
    // return;
    this.userService.createPage(this.CreatePageForm.value.name, this.CreatePageForm.value.pagename,
      this.CreatePageForm.value.image, this.CreatePageForm.value.cover,
      this.CreatePageForm.value.type, this.CreatePageForm.value.description, this.CreatePageForm.value.sport)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.steps = {
            infos: {active: false, done: true},
            details: {active: false, done: true},
            media: {active: false, done: true},
            finish: {active: true, done: true},
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

  goToInfos() {
    this.steps = {
      infos: {active: true, done: false},
      details: {active: false, done: false},
      media: {active: false, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.infos);
  }

  goToDetails() {
    // validation
    // branching
    this.steps = {
      infos: {active: false, done: true},
      details: {active: true, done: false},
      media: {active: false, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.details);
  }

  goToMedia() {
    // validation
    // branching
    this.steps = {
      infos: {active: false, done: true},
      details: {active: false, done: true},
      media: {active: true, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.media);
  }

  goToFinish() {
    // validation
    // branching
    // this.steps = {
    //   infos: {active: false, done: true},
    //   details: {active: false, done: true},
    //   media: {active: false, done: true},
    //   finish: {active: true, done: false},
    // };
    // console.log(this.steps.finish);
    this.onCreatePage();

  }
}
