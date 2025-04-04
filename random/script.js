const calderoHTML = document.getElementById('calderoHTML');
const calderoCSS = document.getElementById('calderoCSS');
const espejo = document.getElementById('espejoMagico');

let comentariosActivos = false;

function actualizarHechizo() {
  const conjuroHTML = calderoHTML.value;
  const conjuroCSS = `<style>${calderoCSS.value}</style>`;
  espejo.srcdoc = conjuroCSS + conjuroHTML;
}

function alternarComentarios() {
  comentariosActivos = !comentariosActivos;
  const boton = document.querySelector("#botonToggleComentarios");

  if (comentariosActivos) {
    boton.textContent = "Ocultar Comentarios";
  } else {
    boton.textContent = "Mostrar Comentarios";
  }
}

function añadirEtiqueta(tipo) {
  let etiqueta = "";
  switch (tipo) {
    case 'h1':
      etiqueta = "<h1></h1>" + (comentariosActivos ? " <!-- h1 = Título principal -->" : "");
      break;
    case 'h2':
      etiqueta = "<h2></h2>" + (comentariosActivos ? " <!-- h2 = Subtítulo -->" : "");
      break;
    case 'h3':
      etiqueta = "<h3></h3>" + (comentariosActivos ? " <!-- h3 = Sub-subtítulo -->" : "");
      break;
    case 'p':
      etiqueta = "<p></p>" + (comentariosActivos ? " <!-- p = Párrafo -->" : "");
      break;
    case 'div':
      etiqueta = "<div></div>" + (comentariosActivos ? " <!-- div = Contenedor genérico -->" : "");
      break;
    case 'a':
      etiqueta = `<a href="#"></a>` + (comentariosActivos ? " <!-- a = Enlace -->" : "");
      break;
    case 'header':
      etiqueta = "<header></header>" + (comentariosActivos ? " <!-- header = Encabezado del sitio o sección -->" : "");
      break;
    case 'footer':
      etiqueta = "<footer></footer>" + (comentariosActivos ? " <!-- footer = Pie de página -->" : "");
      break;
    case 'select':
      etiqueta = `<select>\n  <option>Opción 1</option>\n  <option>Opción 2</option>\n</select>` +
                 (comentariosActivos ? " <!-- select = Menú desplegable -->" : "");
      break;
    default:
      return;
  }

  insertarTexto(etiqueta);

  // Restablecer la selección al valor inicial
  const selector = document.getElementById('tipoEtiqueta');
  if (selector) {
    selector.selectedIndex = 0;
  }
}

function añadirInput() {
  const tipo = document.getElementById('tipoInput').value;
  if (!tipo) return;

  const inputTag = `<input type="${tipo}">`;
  insertarTexto(inputTag);
  document.getElementById('tipoInput').selectedIndex = 0;
}

function insertarTexto(texto) {
  const inicio = calderoHTML.selectionStart;
  const fin = calderoHTML.selectionEnd;
  const contenido = calderoHTML.value;

  calderoHTML.value = contenido.slice(0, inicio) + texto + contenido.slice(fin);
  calderoHTML.focus();
  calderoHTML.selectionEnd = inicio + texto.length;

  actualizarHechizo(); // ¡Reactiva la magia visual!
}

calderoHTML.addEventListener('input', actualizarHechizo);
calderoCSS.addEventListener('input', actualizarHechizo);
actualizarHechizo(); // Primera chispa mágica
