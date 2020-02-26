// © 2020 Chris Mauck
/**
  * Common Utilities
  */

 const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/** @function
 *  @name = zeroPad (number)
 *  @param {number} number The number that needs to be padded.
 *  @return {number} The number after it has been padded.
 */
export function zeroPad(i) {
  if (i < 10) { i = "0" + i; }
  return i;
}

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatMiles(num) {
  return (num / 1609.344).toFixed(2);
}

/** @function
 *  @name = getWeekday()
 *  @returns {string} String representation of the weekday
 */
export function getWeekday() {
  let today = new Date();
  let day = DAY_NAMES[today.getDay()];
  return day;
}

/** @function
 *  @name = getDay()
 *  @returns {number} Todays date padded if required 
 */
export function getDay() {
  let today = new Date();
  let day = zeroPad(today.getDate());
  return day;
}

/**
 * Maps value from one range to another
 * @param value
 * @param istart
 * @param istop
 * @param ostart
 * @param ostop
 * @returns {*}
 */
export function mapNumber(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}