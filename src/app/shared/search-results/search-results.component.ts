import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SearchService} from '../search.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  sendRequest = null;
  results: { header: string, image: string, link: string }[];
  showResults = false;
  @ViewChild('resultsList', {static: false}) resultsList: ElementRef;
  searchForm = new FormGroup({
    search: new FormControl(null, Validators.required),
  });
  constructor(private searchService: SearchService,
              private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.resultsList && e.target !== this.resultsList.nativeElement) {
        this.showResults = false;
        console.log('clicked');
      } else if (e.target === this.resultsList.nativeElement) {
        this.onSearch(this.searchForm.value.search);
      }
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });
    this.searchService.resultsShowed.subscribe((resultsShowed: boolean) => {
      this.showResults = resultsShowed;
    });
  }
  onSearch(value) {
    clearTimeout(this.sendRequest);
    this.sendRequest = setTimeout(() => {
      this.searchService.searchEverything(value)
        .subscribe((response: any) => {
          console.log(response.results);
          this.results = this.searchService.results = response.results;
        });
    }, 500);
  }

}
