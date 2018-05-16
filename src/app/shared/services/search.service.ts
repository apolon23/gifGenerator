import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class SearchService {
  // apiKey: String = 'ZoEUancWddiFIFeCoEozwcdJwIRQpP3L';
  apiKey: String = 'QDlsOFceRXqomFYefGwfga3yD63xnMUt';

  constructor(private http: Http) {}

  searchGif(search: string) {
    return this.http.get(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${this.apiKey}&limit=300`)
      .map((response) => response.json());
  }

}
