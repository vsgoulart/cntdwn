"use strict";

import Countdown from "./index";

jest.useFakeTimers();

describe("Countdown", () => {
  it("should throw an error when the first argument isn't an instance of Date", () => {
    expect(() => new Countdown("foo", () => {})).toThrow();
  });

  it("should throw an error when the second argument isn't a function", () => {
    expect(() => new Countdown(new Date(), "foo")).toThrow();
  });

  it("should execute the callback function after the method start() is called", () => {
    const callback = jest.fn();
    const countdown = new Countdown(new Date(2014, 1, 1), callback);

    countdown.start();

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
  });

  it("should call the callback once and pass (0, 0, 0, 0) as arguments when the date has already occurred", () => {
    const callback = jest.fn();
    const countdown = new Countdown(new Date(2014, 1, 1), callback);

    countdown.start();

    jest.runAllTimers();

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe(0);
    expect(callback.mock.calls[0][1]).toBe(0);
    expect(callback.mock.calls[0][2]).toBe(0);
    expect(callback.mock.calls[0][3]).toBe(0);
  });
});
