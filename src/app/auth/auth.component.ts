import { Component } from '@angular/core';
import { Images } from '../shared/utils/images-enum';


@Component({
  selector: 'app-auth',
  template: `<div class="main">
    <div class="main-container">
    <div class="left-container">
        <img [src]="images.BRAND_LOGO" style="width: 60%;" alt="">
        <h1 class="mt-3">Lorem ipsum dolor</h1>
        <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, mollitia!</p>
        <div class="backdrop-img" >
            <img [src]="images.WATERMARK_LOGO" class="h-100 w-100"  alt="">
        </div>
    </div>
    <div class="right-container">
        <router-outlet></router-outlet>
    </div>
  </div>
  </div>`,
  styles: [`.main-container{
    height: 500px;
    max-width: 900px;
    margin: 10rem auto ;
    box-shadow: 0px 2px 15px  var(--shadow);
    display: grid;
    grid-template-columns: 1.5fr 1fr;
   
}
.main{
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
}
.left-container{
    background: linear-gradient(to top,var(--secondary),var(--primary));
    height: 100%;
    text-align: center;
    position: relative;
    padding: 2rem 2rem;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
}
.right-container{
  display:flex;
  align-items:center;
  justify-content:center;
}
.backdrop-img{
    position: absolute;
    inset: 0;
    padding: 5rem;
    opacity: .2;
}`]
})
export class AuthComponent {
  // This is for getting image urls from Images-enum 
  public get images(){
    return Images
  }

}
