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
    name: new FormControl('pageoss'),
    pagename: new FormControl('pageoss_user'),
    image: new FormControl(null),
    cover: new FormControl(null),
    type: new FormControl('public'),
    description: new FormControl('kokokokokosss'),
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
      .subscribe((response: any) => console.log(response));
  }
}
