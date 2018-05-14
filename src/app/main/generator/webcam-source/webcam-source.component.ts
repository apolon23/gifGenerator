import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {GeneratorService} from '../../../shared/services/generator.service';
import { Gif } from '../../../shared/models/gif.model';
import { Options } from '../../../shared/models/webcam-options.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {GifUploadService} from '../../../shared/services/gif-upload.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-webcam-source',
  templateUrl: './webcam-source.component.html',
  styleUrls: ['./webcam-source.component.css']
})
export class WebcamSourceComponent implements OnInit, OnDestroy {
  initWebCamera: boolean;
  gif: Gif;
  @ViewChild('videoElement') videoElement: ElementRef;
  video: any;
  stream: any;
  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = '20';
  textYCoordinate: any = '20';
  textSize: any;
  textColor: any = '#000000';
  textFont = 'sans-serif';
  exampleGif: object;
  loader = false;
  closeResult: string;
  rec = false;
  recTimer: any;
  progress = 0;
  progressStatus = 'Start working...';
  progressCallback: any;
  currentUser: User;

  constructor(private generatorService: GeneratorService,
              private modalService: NgbModal,
              private fileUploadService: GifUploadService,
              private authenticationService: AuthenticationService) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      time: new FormControl(1),
      speed: new FormControl(1),
      width: new FormControl(360),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
    this.exampleChange();
  }

  ngOnInit() {
    if (this.hasGetUserMedia()) {
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
    this.video = this.videoElement.nativeElement;
    this.initCamera({ video: true, audio: false });
    this.currentUser = this.authenticationService.getUserDetails();

  }
  ngOnDestroy() {
    this.vidOff();
  }

  vidOff() {
    this.video.pause();
    this.video.src = '';
    this.stream.getTracks()[0].stop();
  }
  onMetadata() {
    this.textposition();
  }

  hasGetUserMedia() {
    return !!(navigator.getUserMedia );
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



  generate(content) {
    this.rec = true;
    const timer = setInterval((start) => {
      this.recTimer -= 10;
      if (this.recTimer <= 0) {
        clearInterval(timer);
      }
    }, 10);
    this.recTimer = this.optionsForm.value.time * 100;

    setTimeout(() => {
      this.rec = false;
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.gif = undefined;
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.gif = undefined;
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }, this.optionsForm.value.time * 100);



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
      this.optionsForm.value.time,
      this.optionsForm.value.width,
      examgleDiv.offsetHeight ,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate,
      this.progressCallback

    );

    this.loader = true;
    this.generatorService.webcamConvert(this.options)
      .then(result => {
        this.gif = new Gif(result);
        this.loader = false;
        if (this.optionsForm.value.tags) {
          this.gif.tags = this.optionsForm.value.tags.split(/ /);
        }
      });
  }

  exampleChange() {
    this.exampleGif = {
      'width': this.optionsForm.value.width + 'px',
      'height': this.optionsForm.value.width / 4 * 3 + 'px'
    };
  }

  textposition() {
    const textDiv = document.getElementById('example-text');
    const examgleDiv = document.getElementById('video');
    this.textXCoordinate =    this.optionsForm.value.width / 2 ;
    this.textYCoordinate  =  textDiv.offsetHeight / 2 + examgleDiv.offsetHeight / 2 ;
  }

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

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.initWebCamera = true;
      this.stream = stream;
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    })
      .catch(err => {
        console.log(err);
        this.initWebCamera = false;
      });

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

}
