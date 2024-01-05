import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    pages: Array<any> = new Array<any>()

    ngOnInit(): void {
      this.pages.push( { name: 'Home', route: '/home' } )
      this.pages.push( { name: 'Characters', route: '/characters' } )
      this.pages.push( { name: 'About', route: '/about' } )
    }
}
