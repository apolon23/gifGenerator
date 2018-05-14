import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {appConfig} from '../../app.config';
import {Observable} from 'rxjs/Observable';
import {Images} from '../models/images.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class GifUploadService {
  constructor(private http: HttpClient) { }

postFile(fileToUpload: File, _id: string) {
    let params = new HttpParams();
    const endpoint = appConfig.apiUrl + '/image';
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
  formData.append('_id', JSON.stringify(_id));
    const options = {
    params: params,
    reportProgress: true
  };
    return this.http.post(endpoint, formData, options);
  }
  postGif(gif: any, _id: string) {
    let params = new HttpParams();
    const endpoint = appConfig.apiUrl + '/image';
    const formData: FormData = new FormData();
    formData.append('image', gif, gif.name);
    formData.append('_id', JSON.stringify(_id));
    const options = {
      params: params,
      reportProgress: true
    };
    return this.http.post(endpoint, formData, options);
  }

  getAllAdminImages() {
    return this.http.get<Images[]>(appConfig.apiUrl + '/images');
  }
  getSixImages(_id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('_id', JSON.stringify(_id));
    return this.http.get<Images[]>(appConfig.apiUrl + '/imagesSix', {headers: headers});
  }
  getSixUnregisteredImages() {
    return this.http.get<Images[]>(appConfig.apiUrl + '/imagesSix');
  }
  getById(_id: string): Observable<any> {
    return this.http.get<any>(`${appConfig.apiUrl + '/imagesUser'}/${_id}`);
  }

  deleteImages(images: Images | string): Observable<Images> {
    const id = typeof images === 'string' ? images : images._id;
    const url = `${appConfig.apiUrl + '/images'}/${id}`;

    return this.http.delete<Images>(url, httpOptions);
  }

  postRating(rating: number, imageId: string, _id: string ) {
    const formData: FormData = new FormData();
    formData.append('rating', JSON.stringify(rating));
    formData.append('imageId', JSON.stringify(imageId));
    formData.append('_id', JSON.stringify(_id));
    const endpoint = appConfig.apiUrl + '/ratingUpdate';
    return this.http.put(endpoint, formData);
  }
  guessImage(imageId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('imageId', JSON.stringify(imageId));
    return this.http.get<any>(appConfig.apiUrl + '/search', {headers: headers});
  }
}
