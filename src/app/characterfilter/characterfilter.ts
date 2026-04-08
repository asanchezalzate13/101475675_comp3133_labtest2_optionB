import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import type { Character } from '../models/character.model';
import { HOGWARTS_HOUSES, houseToApiSegment, type HogwartsHouse } from '../models/house.model';
import { HouseColorPipe } from '../pipes/house-color-pipe';
import { PotterApiService } from '../services/potter-api';

export type HouseFilterValue = 'all' | HogwartsHouse;

@Component({
  selector: 'app-characterfilter',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    HouseColorPipe,
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.scss',
})
export class Characterfilter implements OnInit {
  private readonly api = inject(PotterApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly houses = HOGWARTS_HOUSES;
  readonly houseControl = new FormControl<HouseFilterValue>('Slytherin', { nonNullable: true });

  readonly characters = signal<Character[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.houseControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load());
  }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const value = this.houseControl.value;
    this.loading.set(true);
    this.error.set(null);

    if (value === 'all') {
      this.api.getCharacters().subscribe({
        next: (data) => {
          this.characters.set(data);
          this.loading.set(false);
        },
        error: () => this.fail(),
      });
      return;
    }

    this.api.getCharactersByHouse(houseToApiSegment(value)).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => this.fail(),
    });
  }

  private fail(): void {
    this.error.set('Could not load characters for this house.');
    this.loading.set(false);
  }
}
