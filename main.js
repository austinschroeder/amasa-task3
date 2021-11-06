const results = document.getElementById('results');
const input = document.getElementById('searchTerm');
const searchBtn = document.getElementById('search');
const artistsApi = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';

const getArtistTemplate = (artist) => {
  return `

    <div class="col-md-12">

      <div class="card mb-3">
        <img src="${artist.strArtistBanner}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Genre = "${artist.strGenre}"</h5>
          <p class="card-text"></p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>

    </div>
  `;
};

const renderArtists = (artistArr) => {
  artistTemplates = [];

  artistArr.forEach((artist) => {
    artistTemplates.push(getArtistTemplate(artist));
  });

  results.insertAdjacentHTML('afterbegin', artistTemplates.join(''));
};

searchBtn.addEventListener('click', (event) => {
  const query = input.value;

  // GET request using fetch
  fetch(artistsApi + query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderArtists(data.artists);
    });
});
