import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseColor',
  standalone: true,
})
export class HouseColorPipe implements PipeTransform {
  transform(house: string | undefined | null): string {
    if (!house) {
      return '#9e9e9e';
    }
    switch (house.toLowerCase()) {
      case 'gryffindor':
        return '#c41e3a';
      case 'slytherin':
        return '#2a623d';
      case 'ravenclaw':
        return '#0e4f8c';
      case 'hufflepuff':
        return '#ecb939';
      default:
        return '#b0bec5';
    }
  }
}
