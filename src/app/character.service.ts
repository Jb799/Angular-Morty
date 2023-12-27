import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private httpClient: HttpClient) { }

  getCharacters(): Observable<any>{
    return this.httpClient.get<any>('https://rickandmortyapi.com/api/character')
  }
}
