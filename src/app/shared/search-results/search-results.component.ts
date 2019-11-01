import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: {header: string, image: string, link: string}[];
  resultsFound = false;
  searchForm: FormGroup;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });
  }
  onSearch(value) {
    this.searchService.searchEverything(value)
      .subscribe((response: any) => {
        console.log(response.results);
        this.resultsFound = response.results.length > 0;
        this.results = this.searchService.results = response.results;
      });
  }

}
