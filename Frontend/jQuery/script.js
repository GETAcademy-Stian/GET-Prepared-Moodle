$(document).ready(function () {
	let currentSlide = 0;
	const slides = $(".images img");
	function showSlide(index) {
		slides.hide();
		slides.eq(index).show();
	}
	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;
		showSlide(currentSlide);
	}
	setInterval(nextSlide, 3000);
	showSlide(currentSlide);

	$(".images img").click(function () {
		const src = $(this).attr("src");
		$(".lightbox-content").attr("src", src);
		$(".lightbox").fadeIn();
	});

	$(".lightbox, .close").click(function () {
		$(".lightbox").fadeOut();
	});

	$(".filters button").click(function () {
		const filter = $(this).attr("data-filter");
		if (filter === "all") {
			$(".images img").show();
		} else {
			$(".images img").hide();
			$(`.images img[data-category="${filter}"]`).show();
		}
	});
});
