import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'timeStr',
    standalone: true,
})
export class TimeStrPipe implements PipeTransform {
    transform(
        value: number | null,
        format: Intl.DateTimeFormatOptions = DateTime.TIME_SIMPLE,
    ): string {
        if (value === null) return '';
        return DateTime.fromSeconds(value).toLocaleString(format);
    }
}
