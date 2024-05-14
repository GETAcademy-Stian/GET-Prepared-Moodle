const genres = ["Death Metal", "Thrash Metal", "Power Metal", "Industrial Metal", "Hip Hop"];

function getRandomSong(genre) {
	// Simulerer en API-forespørsel for å hente en tilfeldig sang fra en gitt sjanger
	const randomIndex = Math.floor(Math.random() * 10); // Anta at vi har 10 sanger i hver sjanger
	return {
		title: `${genre} Song ${randomIndex}`,
		artist: `Artist ${randomIndex}`,
	};
}

export function getRecommendation() {
	const randomIndex = Math.floor(Math.random() * genres.length);
	const randomSong = getRandomSong(genres[randomIndex]);
	return randomSong;
}
