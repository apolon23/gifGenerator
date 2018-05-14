import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  gifs: Array<any>;
  @Input() query: any;


  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'search': new FormControl(this.query, [Validators.required])
    });
    if (this.query) {
      this.onSubmit();
    }
  }
  onSubmit() {
    this.gifs = undefined;
    const search = this.form.value.search;
    this.searchService.searchGif(search)
      .subscribe(data => {
        this.gifs = data.data;
      });
  }

}
