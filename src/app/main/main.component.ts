import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../download.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
declare var TypeIt;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  url: string;
  downloadClicked = false;
  linkInvalid = false;
  videoInvalid = false;

  constructor(private download: DownloadService, private router: Router) { }

  ngOnInit() {

    new TypeIt('#myElement',{
      loop: true
    })
    .type('Youtube')
    .pause(2000)
    .delete()
    .type('Facebook')
    .pause(2000)
    .delete()
    .type('Vimeo')
    .pause(2000)
    .go();
  }

  setDownload(){
    var patternYoutube = /^(https?\:\/\/)?((www\.|m\.)?youtube\.com|youtu\.?be)\/.+$/;
    var patternFacebook = /^(https?\:\/\/)?((www\.)?facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+)).+$/;
    var patternVimeo = /(https?\:\/\/)?((www\.)?vimeo\.com\/(\d+)).+$/;

    if(patternYoutube.test(this.url) || patternFacebook.test(this.url) || patternVimeo.test(this.url)){
      this.downloadClicked = true;
      this.linkInvalid = false;
      this.videoInvalid = false;
      this.download.getDownloadVideo(this.url).subscribe(data => {
        if(data["error"]){
          this.videoInvalid = true;
          this.downloadClicked = false;
        }else{
          localStorage.setItem("videoData", JSON.stringify(data));
          this.router.navigate(['/download']);
        }
      })
    }else{
      this.linkInvalid = true;
    }
    
  }

}