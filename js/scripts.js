function getSaturdayMoment() {
    var localDay = localStorage.getItem("day")

    if (localDay !== null) {
        return moment(localDay)
    }
    else {
        var saturday = moment().day(-1)
        localStorage.setItem("day", saturday.format())
        return saturday
    }
}

function drawCalendar(posts) {
    var saturday = getSaturdayMoment()

    var cal = d3.select("#calendar")

    posts
        .map(function(post) {
            post.day = moment(post.date, "YYYY-MM-DD HH:mm:ss Z").date()
            return post
        })
        .sort(function(a, b) {
            return a.day - b.day
        })
        .forEach(function(post) {
            var cell = cal.append("a")
                .classed("calendar-cell", true)
                .attr("href", "." + post.url)

            var day = saturday.add(1, "day")
            var isWeekend = day.isoWeekday() === 6 || day.isoWeekday() === 7

            cell.append("div")
                .classed("number", true)
                .classed("number_weekend", isWeekend)
                .text(day.date())

            cell.append("div")
                .classed("advice", true)
                .html(post.title)
        })
}

function drawPostHeader(post) {
    moment.locale("ru")

    var saturday = getSaturdayMoment()
    var offset = moment(post.date, "YYYY-MM-DD HH:mm:ss Z").date()
    var date = saturday.add(offset, "day")

    var header = d3.select("#header")

    header.append("div")
        .classed("post-date", true)
        .html(date.format("D MMMM"))

    header.append("div")
        .classed("post-weekday", true)
        .html(date.format("dddd"))

    header.append("div")
        .classed("post-title", true)
        .html(post.title)
}