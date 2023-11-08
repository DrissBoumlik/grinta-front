import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../page/page.model';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../user.model';
import {PagesService} from '../pages.service';
import {ProfileService} from '../../profile/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.css']
})
export class PageItemComponent implements OnInit {
  @Input() page: Page | any;
  @Input() type = null;
  user: User | any;
  ownPage = false;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private pagesService: PagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.ownPage = this.user.id === this.page.user_id;
  }

  onEditPage() {
    this.router.navigate(['pages/' + this.page.pagename + '/edit']);
  }

  onDeletePage() {
    this.pagesService.deletePage(this.page.id, this.type)
      .subscribe((response: any) => {
        console.log(response);
        this.pagesService.removePage(this.page.id);
      });
  }
}
