const results = document.getElementById('results');
const albums = document.getElementById('albums');
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

const getAlbumTemplate = (album) => {
  return `

    <div class="col-md-12">
        <div class="card mb-3">
          <div class="card-body">
            <p class="album-title card-text">${album.strAlbum}</p>
            <p class="card-text">Year Released: ${album.intYearReleased}</p>
          </div>
        </div>
      </div>
  `;
};

const renderArtists = (artistArr) => {
  let = artistTemplates = [];

  artistArr.forEach((artist) => {
    artistTemplates.push(getArtistTemplate(artist));
  });
  if (artistTemplates.length === 0) {
    const noArtist = document.createElement('p');
    noArtist.className = 'emptyResult';
    noArtist.textContent = 'No Artist info available';
    results.innerHTML = '';
    results.appendChild(noArtist);
  } else {
    const albumHeader = document.createElement('h3');
    albumHeader.className = 'albumHeader';
    albumHeader.textContent = 'Albums:';
    results.innerHTML = '';
    results.appendChild(albumHeader);
    results.insertAdjacentHTML('afterbegin', artistTemplates.join(''));
  }
};

const renderAlbums = (albumArr) => {
  let = albumTemplates = [];

  albumArr.forEach((album) => {
    albumTemplates.push(getAlbumTemplate(album));
  });
  if (albumTemplates.length === 0) {
    const noAlbum = document.createElement('p');
    noAlbum.className = 'emptyResult';
    noAlbum.textContent = 'No Album info available';
    albums.innerHTML = '';
    albums.appendChild(noAlbum);
  } else {
    albums.insertAdjacentHTML('afterbegin', albumTemplates.join(''));
  }
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const query = input.value;

  if (!query) {
    console.log('No input added');
    return;
  }

  const getData = (url) => {
    return fetch(url).then((response) => {
      const result = response.json();
      console.log(result);
      return result;
    });
  };

  getData(artistsApi + query).then((data) => {
    renderArtists(data.artists ?? []);
  });

  getData(albumsApi + query).then((data) => {
    renderAlbums(data.album ?? []);
  });

  //TOOK THIS CODE AND REFACTORED IT ABOVE TO BE MORE EFFICIENT
  // fetch(artistsApi + query)
  //   .then((response) => {
  //     return response.json();
  //   })
  // .then((data) => {
  //   console.log(data);
  //   renderArtists(data.artists ?? []);
  // });

  // fetch(albumsApi + query)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     renderAlbums(data.album ?? []);
  //   });

  document.getElementById('searchTerm').value = '';
});
