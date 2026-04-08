import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type { Character } from '../models/character.model';
import { PotterApiService } from '../services/potter-api';

@Component({
  selector: 'app-characterlist',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.scss',
})
export class Characterlist implements OnInit {
  private readonly api = inject(PotterApiService);

  readonly characters = signal<Character[]>([]);
  /** Bound with ngModel for FormsModule; drives a computed filter via signal. */
  readonly searchText = signal('');
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly filteredCharacters = computed(() => {
    const q = this.searchText().toLowerCase().trim();
    const list = this.characters();
    if (!q) {
      return list;
    }
    return list.filter((c) => c.name.toLowerCase().includes(q));
  });

  ngOnInit(): void {
    this.api.getCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load characters. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
