import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: {header: string, image: string, link: string};

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    console.log(this.result);
  }

}
