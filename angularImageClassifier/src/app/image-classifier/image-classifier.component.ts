import {Component, OnInit, ViewChild} from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {ClassifierService} from '../classifier.service';

@Component({
  selector: 'app-image-classifier',
  templateUrl: './image-classifier.component.html',
  styleUrls: ['./image-classifier.component.css']
})
export class ImageClassifierComponent implements OnInit {
  modelLoded: boolean;
  imageSelected = false;
  private imgSrc: any = null;
  private predictions: any;
  @ViewChild('img', {static: false}) img;

  constructor(private classifierService: ClassifierService) {
  }

  async ngOnInit() {
    this.classifierService.modelLoaded.subscribe(bool => {
      this.modelLoded = bool;
    });
  }

  async fileChange(event) {
    const file = event.target.files[0];

    if (file) {
      this.imageSelected = true;
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;

        setTimeout(async () => {
          this.predictions = await this.classifierService.modelPredict(this.img.nativeElement);
        }, 100);
      };
    }
  }


}
