import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'excerpt' })
export class ExcerptPipe implements PipeTransform {

  transform(value: string, limit?: number): any {

    if (!value) {
      return null;
    }

    const desiredLimit = (limit) ? limit : 50;
    return value.substr(0, desiredLimit) + '...';
  }

}
