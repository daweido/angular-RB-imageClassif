import {Injectable} from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as coco from '@tensorflow-models/coco-ssd';
import {BehaviorSubject, config} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClassifierService {
  private model: any;
  private modelLoadedSubject = new BehaviorSubject<boolean>(false);
  modelLoaded = this.modelLoadedSubject.asObservable();

  constructor() {
    this.loadModel();
  }

  async loadModel() {
    // this.model = await mobilenet.load({
    //   version: 2,
    //   alpha: 1
    // });
    this.model = await coco.load({base: 'mobilenet_v2'});
    this.modelLoadedChange(true);
  }

  modelLoadedChange(bool: boolean) {
    this.modelLoadedSubject.next(bool);
  }

  modelPredict(data: any) {
    // return this.model.classify(data, 5);
    return this.model.detect(data);
  }
}
