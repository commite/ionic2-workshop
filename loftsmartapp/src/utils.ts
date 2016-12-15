import {Pipe} from '@angular/core';

/**
 * Pipe to format API JSON errors into a form ControlGroup
 */
@Pipe({
    name : 'formatErrors'
})
export class FormatErrorsPipe {

    transform(value) {
        if (value.valid) {
            return '';
        }
        let errors = [];
        for (let key in value.errors) {
            if (key === 'required') {
                errors.push('This field is required');
            } else if (key === 'maxlength') {
                errors.push('Value too long');
            } else {
                errors.push(key);
            }
        }
        return errors.join(', ');
    }
}
