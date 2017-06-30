//API KEY NOW REQUIRED
var app = (function movieSearch() {

	var $searchBar = $("#search")
	var $yearBar = $("#year")
	$('#submit').click(search)

	function clearInfoDiv() {
		$('.mainDivHolder').remove()
	}

	function plotSearch	(filmID) {
		var defaultAPI2 = "http://www.omdbapi.com/?plot=full"
		var idrequest = {
			i : filmID
		}
		$.getJSON(defaultAPI2, idrequest, printPlot)
	}

	function search () {
		var defaultAPI = "http://www.omdbapi.com/?"
		var values = {
			s : $searchBar.val(),
			y : $yearBar.val(),
		}
		$.getJSON(defaultAPI, values, print)
	}

	function printPlot (s2) {
		var plot = s2.Plot
		var rating = s2.imdbRating
		var title = s2.Title
		var imdbID = s2.imdbID
		var year = s2.Year
		var poster = s2.Poster

		var $div_holder = $("<div>", {class : "mainDivHolder"})
		var $div_more_info = $("<div>", {class: "more_info"})
		var $div_plot = $("<div>", {class: "plot"})
		var $div_plotInfo = $("<div>", {class: "plot info"})

		$div_holder.append($div_more_info)
		$div_holder.append($div_plot)
		$inner.prepend($div_holder)

		$title = $('<p>', {class: "title"})
		$title.text(title + "  (" + year + ")")

		$rating = $('<p>', {class: "rating"})
		$rating.text("IMDB Rating: " + rating)

		$goBack= $('<a>', {class: "goBack", href: "#"})
		$goBack.text("< Search Results")

		$goBack.click(clearInfoDiv)

		$div_more_info.append($goBack)
		$div_more_info.append($title)
		$title.append($rating)

		var $plotSynopsisHeader = $('<h4>', {class: "plotSynopsisHeader"})
		$plotSynopsisHeader.text("Plot Synopsis: ")

		var $plotSynopsis = $('<p>', {class: "plotSynopsis"})
		$plotSynopsis.text(plot)

		var $goToButtonLink = $('<a>', {href : "http://www.imdb.com/title/" + imdbID, target: "_blank", class: "goToButton"})
		$goToButtonLink.text("View on IMDB")

		$div_plot.append($plotSynopsisHeader)
		$div_plot.append($plotSynopsis)
		$div_plot.append($goToButtonLink)

		if (poster !== "N/A") {
			var $poster = $('<img>', {src:  poster, class : "infoPoster"})
		}

		$div_holder.append($poster)
	}

	function print (s) {
		$inner = $('#movies')
		$inner.empty()

		if (s.Error) {
			var $noneFoundList = $("<li>", {class: "no-movies desc"})
			var $noneFoundI = $("<i>", {class: "material-icons icon-help" })
			$noneFoundI.text("help_outline")
			$noneFoundList.text("No movies found that match: " + $searchBar.val())
			$noneFoundList.prepend($noneFoundI)
			$inner.append($noneFoundList)
		} else {
			for (i = 0; i < s.Search.length; i++) {
				var movieTitle = s.Search[i].Title
				var movieYear = s.Search[i].Year
				var movieID = s.Search[i].imdbID
				var moviePoster = s.Search[i].Poster
				createBox(movieTitle, movieYear, movieID, moviePoster)
			}
		}
	}

	function createBox(title, year, imdbID, poster) {
		var $li = $("<li>")
		var $div = $("<div>", {class: "poster-wrap"})

		if (poster !== "N/A") {
			var $img =$('<img>', {class: "movie-poster",  src : poster })
		} else {
			var $img = "<i class='material-icons poster-placeholder'>crop_original</i>"
		}

		var $spanMT = $('<span>', { class : "movie-title"  })
		$spanMT.html(title)
		var $spanMY = $('<span>', { class : "movie-year"  })
		$spanMY.html(year)

		$li.click(function() {
			clearInfoDiv()
			window.scrollTo(500, 0)
			plotSearch(imdbID)
		})

		$li.append($div)
		$div.append($img)
		$li.append($spanMT)
		$li.append($spanMY)
		$inner.append($li)
	}
}())
