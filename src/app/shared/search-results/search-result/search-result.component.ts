import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: {header: string, image: string, link: string, type: string};
  iconType: string;
  title: string;

  constructor(private searchService: SearchService,
              private router: Router) {}

  ngOnInit() {
    if (this.result.type === 'user') {
      this.title = 'Utilisateur';
      this.iconType = '<span class="user"><i class="iq-bg-danger ri-user-line"></i></span>';
    } else if (this.result.type === 'post') {
      this.title = 'Post';
      this.iconType = '<span class="page"><i class="iq-bg-dark ri-article-line"></i></span>';
    } else if (this.result.type === 'page') {
      this.title = 'Page';
      this.iconType = '<span class="page"><i class="iq-bg-primary ri-pages-line"></i></span>';
    } else if (this.result.type === 'event') {
      this.title = 'Evenement';
      this.iconType = '<span class="event"><i class="iq-bg-warning ri-calendar-event-line"></i></span>';
    }
  }


  goTo() {
    this.searchService.resultsShowed.next(false);
    this.router.navigate([this.result.link]);
  }
}
