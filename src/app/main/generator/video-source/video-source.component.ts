import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Gif } from '../../../shared/models/gif.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from '../../../shared/models/video-options.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../shared/models/user.model';
import {GifUploadService} from '../../../shared/services/gif-upload.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-video-source',
  templateUrl: './video-source.component.html',
  styleUrls: ['./video-source.component.css']
})
export class VideoSourceComponent implements OnInit {
  video: any;
  gif: Gif;
  loader = false;
  duration: number;
  cropForm: FormGroup;
  videoPlayer: any;
  start: number;
  finish: number;

  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = 1;
  textYCoordinate: any = 1;
  textSize: any;
  textColor: any = '#007bff';
  textFont = 'sans-serif';
  exampleGif: object;
  closeResult: string;

  public isCollapsed = true;

  progress = 0;
  progressStatus = 'Start working...';
  progressCallback: any;
  currentUser: User;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal,
              private fileUploadService: GifUploadService,
              private authenticationService: AuthenticationService) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      speed: new FormControl(0.1),
      width: new FormControl(360),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
    this.exampleGif = {
      'width': 360 + 'px'
    };
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
  }

  handleFileInput(files: FileList) {
    this.video = new Img(files[0], this.sanitizer);
  }

  onMetadata(event, videoplayer) {
    this.duration = event.duration;
    this.cropForm = new FormGroup({
      start: new FormControl(0),
      finish: new FormControl(this.duration),
    });
    this.videoPlayer = videoplayer;
    this.start = 0;
    this.finish = this.duration;
    this.textposition();

  }

  timeupdate(e) {
    if (this.finish <= e) {
      this.videoPlayer.pause();
    }
  }

  crop(e) {
    this.start = e.from;
    this.finish = e.to;
    this.videoPlayer.currentTime = this.start;
  }
  play() {
    this.videoPlayer.play();
  }

  pause() {
    this.videoPlayer.pause();
  }

  exampleChange() {
    this.exampleGif = {
      'width': this.optionsForm.value.width + 'px'
    };
  }

  // TEXT ELEMENT CHANGE
  textposition() {
    const textDiv = document.getElementById('example-text');
    const examgleDiv = document.getElementById('video');
    this.textXCoordinate =    this.optionsForm.value.width / 2 ;
    this.textYCoordinate  =  textDiv.offsetHeight / 2 + examgleDiv.offsetHeight / 2 ;
  }

  textChange() {}

  textSizeChange() {
    this.textSize = {
      'font-size': this.optionsForm.value.textSize + 'px',
    };
  }

  textColorChange(event) {
    this.textColor = event;
  }

  selectFont(event) {
    this.textFont = event.target.id;
  }

  onMoveEnd(event) {
    const textDiv = document.getElementById('example-text');
    const examgleDiv = document.getElementById('video');
    this.textXCoordinate = this.optionsForm.value.width / 2 + event.x;
    this.textYCoordinate = textDiv.offsetHeight / 2  + examgleDiv.offsetHeight / 2 + event.y;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addGif() {
    fetch(this.gif.url).then(res => {
      return res.blob();
    }).then(res => {
      const fileName = Math.random().toString(36).substr(2, 5);
      const file = new File([res], fileName, {type: res.type, lastModified: Date.now()});

      this.fileUploadService.postGif(file, this.currentUser._id).subscribe(event => {
        console.log(event);
      }, error => {
        console.log(error);
      });
    });
  }


  generate(content) {

    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.gif = undefined;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.gif = undefined;
    });

    this.progressCallback = (captureProgress) => {
      this.progress = Math.round( captureProgress * 100);
      if (this.progress > 10) {
        this.progressStatus = 'Work in progress...';
      } else if (this.progress > 70) {
        this.progressStatus = 'Almost finished...';
      }
    };
    this.progress = 0;

    const examgleDiv = document.getElementById('video');

    this.options = new Options(
      this.start,
      Math.floor( this.finish * 10 - this.start * 10),
      this.optionsForm.value.speed,
      this.optionsForm.value.width,
      examgleDiv.offsetHeight ,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate,
      this.video.blobUrl,
      this.progressCallback
    );
    this.loader = true;
    this.generatorService.videoConvert(this.options)
      .then(result => {
        this.loader = false;

        this.gif = new Gif(result);
        if (this.optionsForm.value.tags) {
          this.gif.tags = this.optionsForm.value.tags.split(/ /);
        }
      });
  }

}
