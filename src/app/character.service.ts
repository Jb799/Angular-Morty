import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private currentPage = 1;
  
  constructor(private httpClient: HttpClient) { }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getCharacters(url: string = `https://rickandmortyapi.com/api/character?page=${this.currentPage}`): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  getCharacterById(id: string): Observable<any> {
    return this.httpClient.get(`https://rickandmortyapi.com/api/character/${id}`);
  }  
}
