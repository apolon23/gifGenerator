import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../../services/authentication.service';
import {GifUploadService} from '../../services/gif-upload.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit{
  @Input() gif: any;
  closeResult: string;
  currentUser: User;

  constructor(private modalService: NgbModal,
              private fileUploadService: GifUploadService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
    fetch(this.gif.images.original.url).then(res => {
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
