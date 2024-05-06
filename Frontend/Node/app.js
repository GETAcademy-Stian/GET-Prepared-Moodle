const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function create() {
	rl.question("Skriv inn notat: ", (note) => {
		fs.appendFile("notes.txt", note + "\n", (err) => {
			if (err) throw err;
			console.log("Notat opprettet.");
			menu();
		});
	});
}

function view() {
	fs.readFile("notes.txt", "utf-8", (err, data) => {
		if (err) console.log("Ingen notater funnet.");
		else console.log("Dine notater:\n" + data);
		menu();
	});
}

function del() {
	fs.unlink("notes.txt", (err) => {
		if (err) console.log("Kunne ikke slette.");
		else console.log("Notater slettet.");
		menu();
	});
}

function menu() {
	console.log("\nVelg en handling:\n1. Opprett notat\n2. Vis notater\n3. Slett notater\n4. Avslutt");
	rl.question(">", (input) => {
		switch (input) {
			case "1":
				create();
				break;
			case "2":
				view();
				break;
			case "3":
				del();
				break;
			case "4":
				rl.close();
				break;
			default:
				console.log("Ugyldig valg. Prøv igjen.");
				menu();
				break;
		}
	});
}

menu();
