const results = document.getElementById('results');
const input = document.getElementById('searchTerm');
const searchBtn = document.getElementById('search');
const artistsApi = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
const albumsApi = 'https://www.theaudiodb.com/api/v1/json/1/discography.php?s=';
// const albumHeader = document.createElement('h4');

const getArtistTemplate = (artist) => {
  return `

    <div class="col-md-12">
        <div class="card mb-3">
          <img src="${artist.strArtistBanner}" class="card-img-top" alt="Band Image">
          <div class="card-body">
            <h5 class="card-title">${artist.strArtist}</h5>
            <p class="card-text">Year Formed: ${artist.intFormedYear}</p>
            <p class="card-text">Genre: ${artist.strGenre}</p>
            <p class="card-text">Label: ${artist.strLabel}</p>
            <a href="https://${artist.strWebsite}" class="btn btn-secondary" target="_blank">Go to website</a>
            <p class="card-text">Bio: ${artist.strBiographyEN}</p>
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
  const clear = (document.getElementById('results').innerHTML = '');

  fetch(artistsApi + query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderArtists(data.artists);
    });
});

const getAlbumTemplate = (album) => {
  return `

    <div class="col-md-12">
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">${album.strAlbum}</p>
            <p class="card-text">Year Released: ${album.intYearReleased}</p>
          </div>
        </div>
      </div>
  `;
};

const renderAlbums = (albumArr) => {
  albumTemplates = [];

  albumArr.forEach((album) => {
    albumTemplates.push(getAlbumTemplate(album));
  });

  results.insertAdjacentHTML('afterbegin', albumTemplates.join(''));
};

searchBtn.addEventListener('click', (event) => {
  const query = input.value;

  // albumHeader.append('Albums');

  fetch(albumsApi + query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderAlbums(data.album);
    });
});
