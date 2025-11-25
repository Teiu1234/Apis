//para buscar el anime mediant enombre
function buscarElAnime() {
  let nombre = document.getElementById("animeInput").value.trim();
  let container = document.getElementById("anime-container");
  let error = document.getElementById("error");
  let mensaje = document.getElementById("mensaje");

  container.innerHTML = "";
  error.textContent = "";

  if (nombre === "") {
    error.textContent = "Ingresa un nombre para buscar.";
    return;
  }

  mensaje.style.display = "block";

  fetch(`https://api.jikan.moe/v4/anime?q=${nombre}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      mensaje.style.display = "none";
      if (!data.data || data.data.length === 0) {
        error.textContent = "No se encontró ningún anime con ese nombre. :(";
        return;
      }

      let anime = data.data[0];

      container.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.images.jpg.image_url}" alt="${
        anime.title
      }" class="anime-foto">
                <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
                <p><strong>Episodios:</strong> ${
                  anime.episodes ?? "Desconocido"
                }</p>
                <div class="sinopsis-info">
                <p><strong>Sinopsis:</strong> ${
                  anime.synopsis ?? "Sin información"
                }</p>
                </div>
            `;
    })
    .catch(() => {
      mensaje.style.display = "none";
      error.textContent = "Error al buscar el anime.";
    });
}

//para buscar anime al azar
function animeRandom() {
  let id = Math.floor(Math.random() * 5000) + 1;
  let container = document.getElementById("anime-container");
  let error = document.getElementById("error");

  container.innerHTML = "";
  error.textContent = "";

  mensaje.style.display = "block";

  fetch(`https://api.jikan.moe/v4/anime/${id}`)
    .then((response) => response.json())
    .then((data) => {
      mensaje.style.display = "none";
      if (!data.data) {
        error.textContent = "No se pudo obtener un anime random. :/";
        return;
      }

      let anime = data.data;

      container.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.images.jpg.image_url}" alt="${
        anime.title
      }" class="anime-foto">
                <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
                <p><strong>Episodios:</strong> ${
                  anime.episodes ?? "Desconocido"
                }</p>
                <div class="sinopsis-info">
                <p><strong>Sinopsis:</strong> ${
                  anime.synopsis ?? "Sin información"
                }</p>
                </div>
            `;
    })
    .catch(() => {
      mensaje.style.display = "none";
      error.textContent = "Error al obtener anime random. :C";
    });
}

document.getElementById("searchBtn").addEventListener("click", buscarElAnime);
document.getElementById("randomBtn").addEventListener("click", animeRandom);
