window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".temperature span");

	const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/9c49a2a83d8303815ab4ff58a644f7e7/24.932841,67.030406`
		
			fetch(api)
			.then (response => {
				return response.json();
			})
			.then (data => {
				console.log(data);
				const { temperature, summary, icon } = data.currently;
				//Set DOM Elements From the API
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				let celsius = (temperature - 32 ) * (5 / 9);
				temperatureDegree.textContent = Math.floor(celsius);
				//Set icon
				setIcons(icon, document.querySelector(".icon"));

				//change temprature to F/C 
				temperatureSection.addEventListener("click", () => {
					if(temperatureSpan.textContent === "F") {
						temperatureDegree.textContent = celsius;
						temperatureSpan.textContent = "C";
					} else {
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}
				})
			});

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});