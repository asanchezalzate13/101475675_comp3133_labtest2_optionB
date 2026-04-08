import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of, switchMap } from 'rxjs';
import type { Character } from '../models/character.model';
import { PotterApiService } from '../services/potter-api';

@Component({
  selector: 'app-characterdetails',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.scss',
})
export class Characterdetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PotterApiService);

  readonly character = signal<Character | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) {
            return of(null);
          }
          return this.api.getCharacterById(id);
        }),
      )
      .subscribe({
        next: (c) => {
          if (!c) {
            this.error.set('Character not found.');
          } else {
            this.character.set(c);
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load character details.');
          this.loading.set(false);
        },
      });
  }

  wandLengthText(length: number | null): string {
    if (length === null || length === undefined) {
      return '—';
    }
    return String(length);
  }
}
