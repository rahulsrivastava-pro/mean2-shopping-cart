import { Pipe, PipeTransform} from '@angular/core';

/*
 * Changes the case of the first letter of a given number of words in a string.
*/

@Pipe({ name: 'titleCase' })
export class TitleCase implements PipeTransform {
    transform(input: string, length: number): string {
        return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase())) : '';
    }
}