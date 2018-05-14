import { Injectable } from '@angular/core';
import * as gifshot from 'gifshot';

@Injectable()

export class GeneratorService {


  constructor() {}

  photosConvert(options: any) {

    return new Promise((resolve, reject) => {
      gifshot.createGIF(options, (obj) => {
        if (obj.error) {
          console.log(obj);
        }
        resolve(obj.image);
      });
    });
  }

  videoConvert(options: any) {
    return new Promise((resolve, reject) => {
      gifshot.createGIF(options, (obj) => {
        if (obj.error) {
          console.log(obj);
        }

        resolve(obj.image);
      });
    });
  }

  webcamConvert(options: any) {
    return new Promise((resolve, reject) => {
      gifshot.createGIF(options, (obj) => {
        if (obj.error) {
          console.log(obj);
        }
        resolve(obj.image);
      });
    });
  }
}
