import { format, fromUnixTime } from 'date-fns';

/**
 * Parses a timestamp date and returns it formated as a "Oct 5, 53669, 1:09 AM" string
 */
export const postPublishedDate = timestamp => format(+timestamp, 'PPP');
export const commentPublishedDate = timestamp => format(+timestamp, 'LLL do, HH:mm');
export const userSignUpDate = timestamp => format(+timestamp, 'LLL, y');
export const fullDate = timestamp => format(+timestamp, 'PPPp');
