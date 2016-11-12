import { ASPECT_RATIO } from './config';

export function findAppropriateWidth(height) {
    return ASPECT_RATIO * height;
}