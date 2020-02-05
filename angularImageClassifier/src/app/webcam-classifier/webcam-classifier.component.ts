import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassifierService} from '../classifier.service';

@Component({
  selector: 'app-webcam-classifier',
  templateUrl: './webcam-classifier.component.html',
  styleUrls: ['./webcam-classifier.component.css']
})
export class WebcamClassifierComponent implements AfterViewInit, OnInit {
  @ViewChild('video', {static: false}) video: ElementRef;
  modelLoded: boolean;
  webcamLoaded: boolean;
  private predictions: any;

  constructor(private classifierService: ClassifierService) {
  }

  ngOnInit(): void {
    this.webcamLoaded = false;
    this.modelLoded = false;
  }


  ngAfterViewInit(): void {
    const vid = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          vid.srcObject = stream;
          this.webcamLoaded = true;
        })
        .catch((err0r) => {
          console.log('Something went wrong!');
        });
    }

    this.classifierService.modelLoaded.subscribe(bool => {
      this.modelLoded = bool;

      setInterval(async () => {
        if (this.webcamLoaded && this.modelLoded) {
          this.predictions = await this.classifierService.modelPredict(this.video.nativeElement);
        }
      }, 3000);


    });

  }
}
