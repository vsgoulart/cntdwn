var Countdown = function(date, renderCallback){
	if(!(date instanceof Date))
		throw new TypeError("The argument `date` is not an instace of Date.");

	var isFunction = function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	if(!(isFunction(renderCallback)))
		throw new TypeError("The argument `renderCallback` is not a function.");

	var intervalID = 0;

	const RENDER_INTERVAL = 1000;

	const SECONDS_IN_MILLISECONDS = 1000;
	const MINUTES_IN_MILLISECONDS = 60 * SECONDS_IN_MILLISECONDS;
	const HOURS_IN_MILLISECONDS = 60 * MINUTES_IN_MILLISECONDS;
	const DAYS_IN_MILLISECONDS = 24 * HOURS_IN_MILLISECONDS;

	var targetDate = date;

	this.render = function(){
		var differenceInMilliseconds = targetDate.getTime() - Date.now();

		if(differenceInMilliseconds <= 0){
			renderCallback(0, 0, 0, 0);
			this.stop();
		}else{
			var days = Math.floor(differenceInMilliseconds / DAYS_IN_MILLISECONDS);
			differenceInMilliseconds %= DAYS_IN_MILLISECONDS;

			var hours = Math.floor(differenceInMilliseconds / HOURS_IN_MILLISECONDS);
			differenceInMilliseconds %= HOURS_IN_MILLISECONDS;

			var minutes = Math.floor(differenceInMilliseconds / MINUTES_IN_MILLISECONDS);
			differenceInMilliseconds %= MINUTES_IN_MILLISECONDS;

			var seconds = Math.floor(differenceInMilliseconds / SECONDS_IN_MILLISECONDS);
			differenceInMilliseconds %= SECONDS_IN_MILLISECONDS;

			renderCallback(days, hours, minutes, seconds);
		}
	};

	this.start = function(){
		intervalID = setInterval(this.render, RENDER_INTERVAL);
	};

	this.stop = function(){
		clearInterval(intervalID);
	};
}