import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {Page} from '../page/page.model';
import {Sport} from '../../sports/sport.model';
import {PagesService} from '../pages.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SportService} from '../../../shared/sport.service';
import {ProfileService} from '../../profile/profile.service';

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

  CreatePageForm = this.fb.group({
    name: new FormControl('This is a tennis page'),
    pagename: new FormControl('tennis_page'),
    image: new FormControl(null),
    cover: new FormControl(null),
    type: new FormControl('private'),
    description: new FormControl('This is a page description'),
    sport: new FormControl(1, Validators.required)
  });

  constructor(private fb: FormBuilder,
              private pagesService: PagesService,
              private userService: UserService,
              private profileService: ProfileService,
              private sportService: SportService,
              private route: ActivatedRoute) {
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

    this.initForm();
  }

  initForm() {
    let e;
    let t;
    let a;
    let n;
    let o = 1;
    const r = $('fieldset').length;

    function i(e) {
      let t = parseFloat(String(100 / r)) * e;
      t = t.toFixed(), $('.progress-bar').css('width', t + '%');
    }

    i(o), $('.next').click(function() {
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
          n = 1 - a, e.css({
            display: 'none',
            position: 'relative'
          }), t.css({
            opacity: n
          });
        },
        duration: 500
      }), i(++o);
    }), $('.previous').click(function() {
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
          }), a.css({
            opacity: n
          });
        },
        duration: 500
      }), i(--o);
    }), $('.submit').click(() => {
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
    this.userService.createPage(this.CreatePageForm.value.name, this.CreatePageForm.value.pagename,
      this.CreatePageForm.value.image, this.CreatePageForm.value.cover,
      this.CreatePageForm.value.type, this.CreatePageForm.value.description, this.CreatePageForm.value.sport)
      .subscribe(
        (response: any) => console.log(response),
        (error: any) => console.log(error)
      );
  }
}
