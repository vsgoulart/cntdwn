"use strict";

class Cntdwn {
  constructor(date, callback = () => {}) {
    if (!isInstanceOfDate(date)) {
      throw new TypeError("The argument `date` is not an instace of Date.");
    }

    if (!isFunction(callback)) {
      throw new TypeError("The argument `callback` is not a function.");
    }

    this._targetDate = date;
    this._callback = callback;

    this._intervalID = 0;
  }

  start() {
    const calculateInterval = 1000;

    this._intervalID = setInterval(
      this._calculateDifferenceBetweenDates.bind(this),
      calculateInterval
    );
  }

  _calculateDifferenceBetweenDates() {
    const secondInMilliseconds = 1000;
    const minuteInMilliseconds = 60 * secondInMilliseconds;
    const hourInMilliseconds = 60 * minuteInMilliseconds;
    const dayInMilliseconds = 24 * hourInMilliseconds;

    let differenceInMilliseconds = this._targetDate.getTime() - Date.now();

    if (differenceInMilliseconds <= 0) {
      this._callback(0, 0, 0, 0);
      this.stop();
    } else {
      const days = Math.floor(differenceInMilliseconds / dayInMilliseconds);
      differenceInMilliseconds %= dayInMilliseconds;

      const hours = Math.floor(differenceInMilliseconds / hourInMilliseconds);
      differenceInMilliseconds %= hourInMilliseconds;

      const minutes = Math.floor(
        differenceInMilliseconds / minuteInMilliseconds
      );
      differenceInMilliseconds %= minuteInMilliseconds;

      const seconds = Math.floor(
        differenceInMilliseconds / secondInMilliseconds
      );
      differenceInMilliseconds %= secondInMilliseconds;

      this._callback(days, hours, minutes, seconds);
    }
  }

  stop() {
    clearInterval(this._intervalID);
  }
}

const isInstanceOfDate = date => date instanceof Date;

const isFunction = functionToCheck => typeof functionToCheck == "function";

module.exports = Cntdwn;
