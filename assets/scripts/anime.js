// Нам нужно получить данные одного конкретного аниме
// Эти данные нам надо куда-то сохранить
// Эти же данные надо разместить на станице
// Пока идэт запрос на сервер, было бы неплохо, показать какой-то лоадер или типа того ;)

console.log(window);

class NewURLSearchParams {
	storage = {
		
	};

	constructor(searchParams) {
		//нарежет эти параметры по именам и сложит в storage
	}
}

const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('animeId');

let anime;

getAnimeDataFromServer();

function getAnimeDataFromServer() {
	axios.get(`https://api.jikan.moe/v3/anime/${animeId  || 1}/characters_staff`)
		.then(response => {
			if (response.data) {
				const h1 = document.querySelector('h1');
				h1.innerText = response.data.title;

				const synopsis = document.querySelector('h3');
				synopsis.innerText = response.data.synopsis;

				const trailerContainer = document.querySelector('.trailer-container');
				trailerContainer.innerHTML = `
					<iframe width="560" 
							height="315" 
							src="${response.data.trailer_url}" 
							frameborder="0" 
							allowfullscreen></iframe>`;

				const listgroup = document.querySelector('.listgroup');
				listgroup.innerHTML = `
				<li class="type list-group-item w-50 d-flex justify-content-center">Type:${response.data.type}</li>
			  	<li class="status list-group-item w-50 d-flex justify-content-center">Status:${response.data.status}</li>
			  	<li class="studios list-group-item w-50 d-flex justify-content-center">Studios:${prepareStudiosListMarkDown(response.data.studios)}</li>
			  	<li class="genres list-group-item w-50 d-flex justify-content-center">Genres:${prepareGenreListMarkDown(response.data.genres)}</li>`;


			}
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		})
}

function prepareGenreListMarkDown(genres){
	let result = '';

	genres.forEach((genre,i) => {
		result += genre.name;
		if (i + 1 < genres.lenght) {
			result + ', ';
		}
	})

	return result;
}

function prepareStudiosListMarkDown(studios){
	let result = '';

	studios.forEach((studio,i) => {
		result += `<a href="${studio.url}" target="_blank">${studio.name}</a>`
		if (i + 1 < studios.lenght) {
			result + ', ';
		}
	})

	return result;
}