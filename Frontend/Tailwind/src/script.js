function setContainerHeight() {
	var mapHeight = document.getElementById("map").offsetHeight;
	var containerHeight = document.getElementById("map-container").style.height;
	document.getElementById("map-container").style.height = mapHeight + containerHeight + "px";
}

window.addEventListener("load", setContainerHeight);
window.addEventListener("resize", setContainerHeight);
window.openModal = function (modalId) {
	document.getElementById(modalId).style.display = "block";
	document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
};

window.closeModal = function (modalId) {
	document.getElementById(modalId).style.display = "none";
	document.getElementsByTagName("body")[0].classList.remove("overflow-y-hidden");
};

// Close all modals when press ESC
document.onkeydown = function (event) {
	event = event || window.event;
	if (event.key === 27) {
		document.getElementsByTagName("body")[0].classList.remove("overflow-y-hidden");
		let modals = document.getElementsByClassName("modal");
		Array.prototype.slice.call(modals).forEach((i) => {
			i.style.display = "none";
		});
	}
};
