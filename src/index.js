"use strict";

class Countdown {
  constructor(date, renderCallback = () => {}) {
    if (!isInstanceOfDate(date)) {
      throw new TypeError("The argument `date` is not an instace of Date.");
    }

    if (!isFunction(renderCallback)) {
      throw new TypeError("The argument `renderCallback` is not a function.");
    }

    this._targetDate = date;
    this._renderCallback = renderCallback;

    this._intervalID = 0;
  }

  start() {
    const RENDER_INTERVAL = 1000;

    this._intervalID = setInterval(this._render.bind(this), RENDER_INTERVAL);
  }

  _render() {
    const secondInMilliseconds = 1000;
    const minuteInMilliseconds = 60 * secondInMilliseconds;
    const hourInMilliseconds = 60 * minuteInMilliseconds;
    const dayInMilliseconds = 24 * hourInMilliseconds;

    let differenceInMilliseconds = this._targetDate.getTime() - Date.now();

    if (differenceInMilliseconds <= 0) {
      this._renderCallback(0, 0, 0, 0);
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

      this._renderCallback(days, hours, minutes, seconds);
    }
  }

  stop() {
    clearInterval(this._intervalID);
  }
}

const isInstanceOfDate = date => date instanceof Date;

const isFunction = functionToCheck => typeof functionToCheck == "function";

module.exports = Countdown;
