export type HogwartsHouse = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw';

export const HOGWARTS_HOUSES: HogwartsHouse[] = [
  'Gryffindor',
  'Slytherin',
  'Hufflepuff',
  'Ravenclaw',
];

/** API path segment for /api/characters/house/:house */
export function houseToApiSegment(house: HogwartsHouse): string {
  return house.toLowerCase();
}
