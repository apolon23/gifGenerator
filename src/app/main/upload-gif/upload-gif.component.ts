import {Component, OnInit} from '@angular/core';
import {GifUploadService} from '../../shared/services/gif-upload.service';
import {User} from '../../shared/models/user.model';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-upload-gif',
  templateUrl: './upload-gif.component.html',
  styleUrls: ['./upload-gif.component.css']
})
export class UploadGifComponent implements OnInit {
  imageUrl: string = '../../../assets/images/default-image.png';
  fileToUpload: File = null;
  currentUser: User;
  constructor(private authenticationService: AuthenticationService,
              private fileUploadService: GifUploadService) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.readyInput();
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  uploadFileToActivity(Image) {
    this.fileUploadService.postFile(this.fileToUpload, this.currentUser._id).subscribe(event => {
      this.imageUrl = '../../../assets/images/default-image.png';
      Image.value = null;
    }, error => {
      console.log(error);
    });
  }

  readyInput() {
    let inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        // console.log(this.files);
        let fileName = '';
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        }
        if (fileName) {
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  }



}
