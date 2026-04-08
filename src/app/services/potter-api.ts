import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import type { Character } from '../models/character.model';

const BASE = 'https://hp-api.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class PotterApiService {
  private readonly http = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${BASE}/api/characters`);
  }

  getCharactersByHouse(houseSegment: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${BASE}/api/characters/house/${houseSegment}`);
  }

  getCharacterById(id: string): Observable<Character | null> {
    return this.http.get<Character[]>(`${BASE}/api/character/${id}`).pipe(
      map((rows) => (rows?.length ? rows[0]! : null)),
    );
  }
}
