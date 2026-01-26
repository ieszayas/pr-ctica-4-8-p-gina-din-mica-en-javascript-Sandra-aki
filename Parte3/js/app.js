// Espera a que cargue todo el HTML antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // PARTE 2 - DATOS Y TABLA

    // Array con las obras que se muestran en la tabla
    let listaUsuariosUobras = [
        { titulo: "La Promesa de Liyue", fandom: "Genshin Impact", autor: "XiaoLover", estado: "Completo" },
        { titulo: "Pociones Avanzadas", fandom: "Harry Potter", autor: "SlytherinPrince", estado: "WIP" },
        { titulo: "Juego Final", fandom: "Squid Game", autor: "Player456", estado: "Hiatus" },
        { titulo: "Redencion", fandom: "Hazbin Hotel", autor: "AngelDustFan", estado: "Completo" },
        { titulo: "Vengadores Unidos", fandom: "Marvel MCU", autor: "TonyStark", estado: "Completo" }
    ];

    // Referencia al cuerpo de la tabla
    const tablaCuerpo = document.getElementById('tablaObrasCuerpo');

    // Referencia al body de la pagina
    const body = document.body;

    // Referencia al boton de cambio de tema
    const btnTema = document.getElementById('btnTema');

    // Referencia al formulario
    const form = document.querySelector('form');

    // Funcion que genera la tabla dinamicamente
    const renderizarTabla = (fandomResaltado = "") => {

        // Si no existe la tabla se corta la funcion
        if (!tablaCuerpo) return;

        // Limpia la tabla antes de volver a cargarla
        tablaCuerpo.innerHTML = "";

        // Recorre el array de obras
        listaUsuariosUobras.forEach(item => {

            // Crea una fila nueva
            const fila = document.createElement('tr');

            // Si el fandom coincide se resalta la fila
            if (
                fandomResaltado &&
                item.fandom.toLowerCase().includes(fandomResaltado.toLowerCase())
            ) {
                fila.classList.add('table-warning');
            }

            // Inserta los datos dentro de la fila
            fila.innerHTML = `
                <td>${item.titulo}</td>
                <td>${item.fandom}</td>
                <td>${item.autor}</td>
                <td>
                    <span class="badge ${item.estado === 'Completo' ? 'bg-success' : 'bg-warning text-dark'}">
                        ${item.estado}
                    </span>
                </td>
                <td><i class="bi bi-eye text-light hover-dorado"></i></td>
            `;

            // Agrega la fila a la tabla
            tablaCuerpo.appendChild(fila);
        });
    };

    // Muestra la tabla al cargar la pagina
    renderizarTabla();

    // PARTE 1 - MODO OSCURO

    // Funcion que aplica el tema claro u oscuro
    const aplicarTema = (esClaro) => {

        // Si el modo es claro
        if (esClaro) {

            // Agrega la clase claro al body
            body.classList.add('claro');

            // Cambia el texto y estilo del boton
            if (btnTema) {
                btnTema.innerHTML = '<i class="bi bi-moon-stars me-2"></i>Modo Oscuro';
                btnTema.classList.replace('btn-borde-dorado', 'btn-outline-dark');
            }

        } else {

            // Quita la clase claro
            body.classList.remove('claro');

            // Cambia el texto y estilo del boton
            if (btnTema) {
                btnTema.innerHTML = '<i class="bi bi-brightness-high me-2"></i>Modo Claro';
                btnTema.classList.replace('btn-outline-dark', 'btn-borde-dorado');
            }
        }
    };

    // Lee el tema guardado en localStorage
    let temaGuardado = localStorage.getItem('modoClaro') === 'true';

    // Aplica el tema guardado
    aplicarTema(temaGuardado);

    // Evento para cambiar el tema al hacer click
    if (btnTema) {
        btnTema.addEventListener('click', () => {

            // Detecta el tema actual
            const ahoraEsClaro = !body.classList.contains('claro');

            // Aplica el nuevo tema
            aplicarTema(ahoraEsClaro);

            // Guarda la preferencia en localStorage
            localStorage.setItem('modoClaro', ahoraEsClaro);
        });
    }

    // PARTE 1 - BOTON LIMPIAR

    // Referencia al boton limpiar
    const btnLimpiar = document.getElementById('btnLimpiar');

    // Evento del boton limpiar
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {

            // Referencia al toast de limpiar
            const el = document.getElementById('toastLimpiar');

            // Muestra el toast
            if (el) new bootstrap.Toast(el).show();
        });
    }

    // PARTE 1 Y 2 - FORMULARIO

    // Evento de envio del formulario
    if (form) {
        form.addEventListener('submit', (e) => {

            // Evita el envio automatico
            e.preventDefault();

            // Obtiene los valores del formulario
            const tituloVal = document.getElementById('titulo').value;
            const emailVal = document.getElementById('email').value;
            const fandomSelect = document.getElementById('fandomSelect');
            const fandomVal = fandomSelect.options[fandomSelect.selectedIndex].text;
            const sinopsisVal = document.getElementById('sinopsis').value;
            const esWip = document.getElementById('wipCheck').checked;

            // Validacion de caracteres del titulo
            const regexAlphaNum = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;
            if (!regexAlphaNum.test(tituloVal)) {
                mostrarError("El titulo no permite caracteres especiales.");
                return;
            }

            // Validacion de fandom seleccionado
            if (fandomSelect.value === "") {
                mostrarError("Selecciona un fandom valido.");
                return;
            }

            // Validacion de largo de la sinopsis
            if (sinopsisVal.trim().length < 20) {
                mostrarError("La sinopsis es muy corta.");
                return;
            }

            // Crea el objeto con los datos del formulario
            const nuevaObra = {
                titulo: tituloVal,
                fandom: fandomVal,
                autor: emailVal.split('@')[0],
                estado: esWip ? "WIP" : "Completo"
            };

            // Guarda la nueva obra en el array
            listaUsuariosUobras.push(nuevaObra);

            // Muestra el array en consola
            console.log("Nueva obra registrada:");
            console.table(listaUsuariosUobras);

            // Actualiza la tabla y resalta el fandom
            renderizarTabla(fandomVal);

            // Muestra el toast de envio correcto
            const elEnvio = document.getElementById('toastEnvio');
            if (elEnvio) new bootstrap.Toast(elEnvio).show();

            // Limpia el formulario despues de 2 segundos
            setTimeout(() => {
                form.reset();
            }, 2000);
        });
    }

    // Funcion que muestra errores con toast
    function mostrarError(mensaje) {

        // Referencias al toast de error
        const elError = document.getElementById('toastError');
        const txtError = document.getElementById('mensajeErrorTexto');

        // Inserta el mensaje y muestra el toast
        if (elError && txtError) {
            txtError.textContent = mensaje;
            new bootstrap.Toast(elError).show();
        }
    }
});

// PARTE 3 - INTERACTIVIDAD

// Funcion del reloj digital
function actualizarReloj() {

    // Obtiene la hora actual
    const ahora = new Date();

    // Formatea horas minutos y segundos
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');

    // Referencia al elemento del reloj
    const relojEl = document.getElementById('relojDigital');

    // Muestra la hora en pantalla
    if (relojEl) {
        relojEl.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

// Actualiza el reloj cada segundo
setInterval(actualizarReloj, 1000);

// Ejecuta el reloj al cargar
actualizarReloj();

// Campo de busqueda
const inputBusqueda = document.getElementById('inputBusqueda');

// Evento al escribir en la busqueda
if (inputBusqueda) {
    inputBusqueda.addEventListener('keyup', () => {

        // Texto escrito por el usuario
        const valor = inputBusqueda.value.toLowerCase();

        // Todas las filas de la tabla
        const filas = document.querySelectorAll('#tablaObrasCuerpo tr');

        // Muestra u oculta filas segun el texto
        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            fila.style.display = textoFila.includes(valor) ? '' : 'none';
        });
    });
}

// Selector de color
const selectorColor = document.getElementById('selectorColor');

// Evento cuando cambia el color
if (selectorColor) {
    selectorColor.addEventListener('input', (e) => {

        // Color seleccionado
        const color = e.target.value;

        // Referencia a la tabla
        const tabla = document.querySelector('.table');

        // Cambia colores de la tabla
        if (tabla) {
            tabla.style.borderColor = color;
            tabla.querySelector('thead').style.backgroundColor = color;
        }
    });
}

// Contador de caracteres de la sinopsis
const sinopsisArea = document.getElementById('sinopsis');
const contadorEl = document.getElementById('contadorCaracteres');

// Evento al escribir en la sinopsis
if (sinopsisArea && contadorEl) {
    sinopsisArea.addEventListener('input', () => {

        // Cantidad de caracteres escritos
        const longitud = sinopsisArea.value.length;

        // Muestra el contador
        contadorEl.textContent = `${longitud} caracteres (minimo 20)`;

        // Cambia el color segun el largo
        contadorEl.style.color = longitud < 20 ? 'red' : 'green';
    });
}

// Boton filtro WIP
const btnFiltroWip = document.getElementById('filtroWip');

// Evento del filtro
if (btnFiltroWip) {
    btnFiltroWip.addEventListener('click', () => {

        // Todas las filas de la tabla
        const filas = document.querySelectorAll('#tablaObrasCuerpo tr');

        // Muestra solo las filas WIP
        filas.forEach(fila => {
            const esWip = fila.textContent.includes('WIP');
            fila.style.display = esWip ? '' : 'none';
        });
    });
}
