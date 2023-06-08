import { Component } from '@angular/core';
import { Images } from '../shared/utils/images-enum';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="container mt-5">
    <img [src]="images.PAGE_NOT_FOUND" class="mb-5" alt="">
  <p>We're sorry, but the page you requested could not be found.</p>
  <p>Please check the URL or try searching for the page using the search bar above.</p>
</div>`,
  styles: [`.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 20px;
  }`]
})
export class PageNotFoundComponent {
  public get images(){
    return Images
  }
}
