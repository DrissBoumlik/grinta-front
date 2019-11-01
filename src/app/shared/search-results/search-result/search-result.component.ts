import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: {header: string, image: string, link: string};

  constructor(private searchService: SearchService,
              private router: Router) {}

  ngOnInit() {
  }


  goTo() {
    this.searchService.resultsShowed.next(false);
    this.router.navigate([this.result.link]);
  }
}
