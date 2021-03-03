// где-то хранить остатки, котрые прислал сервер
// надо где-то хранить актуальные карточки, которые мы показываем

let tempAnimeList;
let currentAnimeList = [];
let animePageCount = 1;

getTopAnimeFromServer();


function getTopAnimeFromServer() {
	axios.get(`https://api.jikan.moe/v3/top/anime/${animePageCount}/upcoming`)
		.then(response => {
			if (response.data && response.data.top) {
				tempAnimeList = response.data.top;
				animePageCount++;

				addNewItemsToCurrent();
			}
		})
		.catch(err => {
			console.error(err);
		})
}

function renderCardList(containerId, array) {
	const containerBlock = document.getElementById(containerId);
	if (containerBlock) {
		containerBlock.innerHTML = prepareAnimeTopListMarkdown(array);
	} else {
		console.error('Разработчик, одумойся, нет такого ID!');
	}
}

function prepareAnimeTopListMarkdown(animeList) {
	let result = '';

	animeList.forEach(anime => {
		result += `
			<div class="col-3"
				<div class="card">
				  <img src="${anime.image_url}" class="card-img-top" alt="...">
				  <div class="card-body">
				    <h5 class="card-title">${anime.title}</h5>
				    <a href="anime.html?animeId=${anime.mal_id}" class="btn btn-primary">Подробнее</a>
				  </div>
				</div>
			</div>
		`
	})

	return result;
}

function showMoreTopAnime() {
	if (!tempAnimeList.length) {
		axios.get(`https://api.jikan.moe/v3/top/anime/${animePageCount}/upcoming`)
			.then(response => {
				if (response.data && response.data.top) {
					tempAnimeList = response.data.top;
					animePageCount++;

					addNewItemsToCurrent();
				}
			})
			.catch(err => {
				console.error(err);
			})
	} else {
		addNewItemsToCurrent();
	}
}

function addNewItemsToCurrent() {
	currentAnimeList = currentAnimeList.concat(tempAnimeList.splice(0, 10));

	console.log('ожидают прилавка', tempAnimeList);
	console.log('выложено на прилавок', currentAnimeList);

	renderCardList('topList', currentAnimeList);
}



