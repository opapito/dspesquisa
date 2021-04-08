import moment from 'moment';

const formatDate = (date: string) => {
    return moment.parseZone(date).format('MM/DD/YYYY HH:mm');
    /*
   !If your date format has a fixed timezone offset, use moment.parseZone:
   * see https://momentjs.com/guides/#/parsing/local-utc-zone/
  */
};

export default formatDate;
