let contador = 0;

function agregarAnime(name, estado, valor, info) {
  if (!name || !estado || !valor) return;
  contador++;

  const lista = document.getElementById('anime_lista');
  const nuevoDato = document.createElement('li');
  const datos = [name, estado, valor + "/10"];

  datos.forEach((dato, posX) => {
    const elemento = document.createElement('p');
    elemento.textContent = dato;
    if (posX === 0) {
      elemento.addEventListener('click', () => navigator.clipboard.writeText(dato)
        .catch(err => console.error('Error al copiar al portapapeles: ', err)));
    }

    (posX === 1 && info) ? elemento.dataset.title = info :
    (posX === 2) ? elemento.dataset.title = `Anime Nº ${contador}` : null;

    elemento.style.color = (posX === 1 && estado === 'Visto') ? '#018235' : 
                      (posX === 1 && estado === 'Pendiente') ? '#b50505' :
                      (posX === 1  && estado === 'Estreno') ? '#d56909' : '';
    nuevoDato.appendChild(elemento);
  });
  lista.appendChild(nuevoDato);

  const estados = document.querySelectorAll('#anime_lista li');
  let contVistos = 0;
  let contPendientes = 0;
  let contEstr = 0;

  estados.forEach(li => {
    const estadoTexto = li.querySelector('p:nth-child(2)')?.textContent || '';
    contVistos += estadoTexto.match(/Visto/g)?.length || 0;
    contPendientes += estadoTexto.match(/Pendiente/g)?.length || 0;
    contEstr += estadoTexto.match(/Estreno/g)?.length || 0;
  });

  const pendButton = document.getElementById('pend');
  const vistoButton = document.getElementById('visto');
  const estrButton = document.getElementById('estr');
  const totalButton = document.getElementById('total');
  
  pendButton.textContent = `Pendientes: ${contPendientes}`;
  vistoButton.textContent = `Vistos: ${contVistos}`;
  estrButton.textContent = `Estrenos: ${contEstr}`;
  totalButton.textContent = `Total: ${contPendientes + contVistos + contEstr}`;

  pendButton.addEventListener('click', () => filterItems('Pendiente'));
  vistoButton.addEventListener('click', () => filterItems('Visto'));
  estrButton.addEventListener('click', () => filterItems('Estreno'));
  totalButton.addEventListener('click', () => filterItems('total'));
  
  function filterItems(keyword) {
    estados.forEach(li => {
      const estadoTexto = li.querySelector('p:nth-child(2)').textContent;
      if (keyword === 'total') {
        li.style.display = 'flex';
      } else {
        li.style.display = estadoTexto.includes(keyword) ? 'flex' : 'none';
      }
    });
  }

}

const lista = document.getElementById('anime_lista');
const buscarInput = document.getElementById('buscar');

buscarInput.addEventListener('input', function () {
  const animeBuscado = this.value.trim().toLowerCase();

  lista.querySelectorAll('li').forEach(dsply => {
    const nameAnime = dsply.querySelector('p:first-child').textContent.trim().toLowerCase();
    dsply.style.display = nameAnime.includes(animeBuscado) ? 'flex' : 'none';
  });
});