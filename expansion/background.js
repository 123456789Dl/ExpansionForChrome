const requestURL = 'http://localhost:3000/user'
const xhr = new XMLHttpRequest()

chrome.history.onVisited.addListener(function(result) {
	let now = new Date()

let options = {

  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

let date = (now.toLocaleString("ru", options));
let massiv = date.split(',')

	const url = {
		url: result.url,
		date: massiv[1],
		time: massiv[2]
	}
	xhr.open('POST', requestURL)

	xhr.setRequestHeader('Content-type', 'application/json')

	
	xhr.send(JSON.stringify(url))

})