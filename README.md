# Cntdwn

Cntdwn is a library that calculates the difference of time between an arbitrary date and the current date and executes a callback function each second passing the new difference of time.

## Installation

Just run ```npm install cntdwn``` or ```yarn add cntdwn```

## Example

```javascript
  const Cntdwn = require("cntdwn");

  const countdown = new Cntdwn(
    new Date(2019, 1, 1),
    (days, hours, minutes, seconds) => {
      console.log(days, hours, minutes, seconds);

      if(days < 10) {
        countdown.stop();
      }
  });

  countdown.start();
```
