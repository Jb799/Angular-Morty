import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  characters: Array<any> = new Array<any>
  pageInfo: Array<any> = new Array<any>

  constructor(private characterService: CharacterService) {}

  ngOnInit():void {
    this.characterService.getCharacters().subscribe(
      (data) => {
        this.characters = data["results"]
        this.pageInfo = data["info"]

        console.log(this.characters)
      }
    )
  }
}
