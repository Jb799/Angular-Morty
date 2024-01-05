import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Array<any> = [];
  pageInfo: any;
  currentPage: number = 1;
  totalPages: number = 0;
  filteredCharacters: Array<any> = [];
  searchTerm: string = '';

  constructor(private router: Router, private characterService: CharacterService) {}

  ngOnInit(): void {
    this.currentPage = this.characterService.getCurrentPage();
    this.loadCharacters();
  }

  filterCharacters() {
    if (this.searchTerm) {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Réinitialiser à la liste complète des personnages si searchTerm est vide
      this.filteredCharacters = [...this.characters];
    }
  }

  loadCharacters() {
    this.characterService.getCharacters().subscribe(data => {
      this.characters = data.results;
      this.filteredCharacters = [...this.characters];
      this.pageInfo = data.info;
      this.totalPages = data.info.pages;

      // Calculer le numéro de la page actuelle
      this.calculateCurrentPage();
    });
  }

  onNextPage() {
    if (this.pageInfo && this.pageInfo.next) {
      this.characterService.setCurrentPage(this.currentPage + 1);
      this.loadCharacters();
    }
  }

  onPreviousPage() {
    if (this.pageInfo && this.pageInfo.prev) {
      this.characterService.setCurrentPage(this.currentPage - 1);
      this.loadCharacters();
    }
  }

  calculateCurrentPage() {
    // La logique existante pour calculer le numéro de la page actuelle
    var nextUrl = this.getPageNumberFromUrl(this.pageInfo.next);
    var prevUrl = this.getPageNumberFromUrl(this.pageInfo.prev);
    if(nextUrl !== null){
      this.currentPage = nextUrl - 1;
    }else if (prevUrl !== null){
      this.currentPage = prevUrl + 1;
    }else{
      this.currentPage = 0;
    }
  }

  // Récupère le numéro de la page depuis l'URL
  getPageNumberFromUrl(url: string): number | null {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? Number(match[1]) : null;
  }

  onSelectCharacter(id: number) {
    this.router.navigate(['/character', id]);
  }
}