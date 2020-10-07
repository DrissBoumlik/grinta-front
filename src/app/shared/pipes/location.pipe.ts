import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'location' })
export class LocationPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const position = value.split(',');
    return {
      latitude: position[0],
      longitude: position[1]
    };
  }

}
