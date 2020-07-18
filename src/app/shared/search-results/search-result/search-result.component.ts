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

  constructor(private searchService: SearchService,
              private router: Router) {}

  ngOnInit() {
    if (this.result.type === 'user') {
      this.iconType = '<div class="user iq-bg-danger"><i class="ri-user-line"></i></div>';
    } else if (this.result.type === 'page') {
      this.iconType = '<div class="page iq-bg-primary"><i class="ri-pages-line"></i></div>';
    } else if (this.result.type === 'event') {
      this.iconType = '<div class="event iq-bg-warning"><i class="ri-calendar-event-line"></i></div>';
    }
  }


  goTo() {
    this.searchService.resultsShowed.next(false);
    this.router.navigate([this.result.link]);
  }
}
