import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import jaLocale from 'timeago.js/lib/lang/ja';
import enLocale from 'timeago.js/lib/lang/en_US';

register('ko', koLocale);
register('ja', jaLocale);
register('en', enLocale);

// 시간을 현재 시간과 비교하여 문자열로 반환
export const formatAgo = (date, lang = 'en_US') => {
  return format(date, lang);
};
