import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {GeneratorService} from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { Gif } from '../../../shared/models/gif.model';
import { Options } from '../../../shared/models/images-options.model';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GifUploadService} from '../../../shared/services/gif-upload.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {User} from '../../../shared/models/user.model';
import {ImageSourceComponent} from '../image-source/image-source.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gif-redactor',
  templateUrl: './gif-redactor.component.html',
  styleUrls: ['./gif-redactor.component.css']
})
export class GifRedactorComponent implements OnInit {

  @Input() source: Array<Img>;
  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = 0;
  textYCoordinate: any = 0;
  textSize: any;
  textColor: any = '#007bff';
  textFont = 'sans-serif';
  exampleGif: object;
  loader = false;
  gif: any;
  closeResult: string;
  progress = 0;
  progressStatus = 'Start working...';
  progressCallback: any;
  currentUser: User;
  modalReference: NgbModalRef;
  constructor(private generatorService: GeneratorService,
              private modalService: NgbModal,
              private router: Router,
              private fileUploadService: GifUploadService,
              private authenticationService: AuthenticationService) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      speed: new FormControl(1),
      width: new FormControl(365),
      height: new FormControl(205),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
    this.exampleChange();
    this.options = new Options();

  }

  ngOnInit() {
    this.textposition();
    this.currentUser = this.authenticationService.getUserDetails();
  }

  exampleChange() {
    this.exampleGif = {
      'width': this.optionsForm.value.width + 'px',
      'height': this.optionsForm.value.height + 'px'
    };
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

  textposition() {
    const textDiv = document.getElementById('example-text');
    this.textXCoordinate = this.optionsForm.value.width / 2 ;
    this.textYCoordinate = textDiv.offsetHeight / 2 + this.optionsForm.value.height / 2 ;
  }

  onMoveEnd(event) {
    const textDiv = document.getElementById('example-text');
    this.textXCoordinate = this.optionsForm.value.width / 2 + event.x;
    this.textYCoordinate = textDiv.offsetHeight / 2  + this.optionsForm.value.height / 2 + event.y;
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

  JoinAndClose() {
    this.router.navigate(['/']);
    this.modalReference.close();
  }
  generateGif(content) {

    this.modalReference =  this.modalService.open(content, { centered: true } );
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.gif = undefined;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.gif = undefined;
    });

    const checkedPhotos = this.source.filter(elem => elem.state === 'checked')
      .map(elem => elem.blobUrl);
    this.progressCallback = (captureProgress) => {
      this.progress = Math.round( captureProgress * 100);
      if (this.progress > 10) {
        this.progressStatus = 'Work in progress...';
      } else if (this.progress > 70) {
        this.progressStatus = 'Almost finished...';
      }
    };
    this.progress = 0;

    this.options = new Options(
      this.optionsForm.value.speed,
      this.optionsForm.value.width,
      this.optionsForm.value.height,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate,
      checkedPhotos,
      this.progressCallback
    );

    this.loader = true;
    this.generatorService.photosConvert(this.options)
      .then(result => {
        this.loader = false;
        this.gif = new Gif(result);
        if (this.optionsForm.value.tags) {
          this.gif.tags = this.optionsForm.value.tags.split(/ /);
        }
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
        this.JoinAndClose();
      }, error => {
        console.log(error);
      });
    });
  }

}

