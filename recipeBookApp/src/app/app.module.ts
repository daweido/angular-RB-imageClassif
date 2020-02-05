import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {HttpClientModule} from '@angular/common/http';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartComponent} from './cart/cart.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule, MatChipsModule, MatListModule} from '@angular/material';
import {RecipeBottomSheetComponent} from './recipe-list/recipe-bottom-sheet/recipe-bottom-sheet.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    NewRecipeComponent,
    CartComponent,
    RecipeBottomSheetComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    MatChipsModule
  ],
  entryComponents: [
    RecipeBottomSheetComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
