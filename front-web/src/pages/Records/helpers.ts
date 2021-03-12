import moment from 'moment';

export const formatDate =  (date: string) =>{
  return moment.parseZone(date).format('DD/MM/YYYY HH:mm');
  /*
   !If your date format has a fixed timezone offset, use moment.parseZone:
   * see https://momentjs.com/guides/#/parsing/local-utc-zone/
  */
}