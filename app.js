window.addEventListener("load", () => {
	let long;
	let lat;

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
		})

		});
	}
});