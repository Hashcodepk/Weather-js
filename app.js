window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/9c49a2a83d8303815ab4ff58a644f7e7/${lat},${long}`
		
			fetch(api)
			.then (response => {
				return response.json();
			})
			.then (data => {
				console.log(data);
				const { temperature, summary, icon } = data.currently;
				//Set DOM Elements From the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//Set icon
				setIcons(icon, document.querySelector(".icon"));
			});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});