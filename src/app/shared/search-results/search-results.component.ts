import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SearchService} from '../search.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  sendRequest = null;
  results: { header: string, image: string, link: string, type: string}[] = [];
  showResults = false;
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  searchForm = new FormGroup({
    search: new FormControl(null, Validators.required),
  });

  constructor(private searchService: SearchService,
              private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.searchInput && e.target !== this.searchInput.nativeElement) {
        this.showResults = false;
      } else if (this.searchInput && e.target === this.searchInput.nativeElement) {
        this.onSearch(this.searchForm.value.search);
      }
    });
  }

  ngOnInit() {
    // this.searchForm = new FormGroup({
    //   search: new FormControl(null)
    // });
    // this.searchService.resultsShowed.subscribe((resultsShowed: boolean) => {
    //   this.showResults = resultsShowed;
    // });
  }

  onSearch(value: string) {
    clearTimeout(this.sendRequest);
    if (value && value.length > 0) {
      this.sendRequest = setTimeout(() => {
        this.searchService.searchEverything(value)
          .subscribe(
            (response: any) => {
              this.results = this.searchService.results = response.results;
              this.showResults = true;
            },
            (error: any) => console.log(error)
          );
      }, 500);
    } else {
      this.showResults = false;
    }
  }

}
