document.addEventListener('DOMContentLoaded', () => {

    // === 1. ESTRUCTURA DE DATOS (Parte 2) ===
    let listaUsuariosUobras = [
        { titulo: "La Promesa de Liyue", fandom: "Genshin Impact", autor: "XiaoLover", estado: "Completo" },
        { titulo: "Pociones Avanzadas", fandom: "Harry Potter", autor: "SlytherinPrince", estado: "WIP" },
        { titulo: "Juego Final", fandom: "Squid Game", autor: "Player456", estado: "Hiatus" },
        { titulo: "Redencion", fandom: "Hazbin Hotel", autor: "AngelDustFan", estado: "Completo" },
        { titulo: "Vengadores Unidos", fandom: "Marvel MCU", autor: "TonyStark", estado: "Completo" }
    ];

    const tablaCuerpo = document.getElementById('tablaObrasCuerpo');
    const body = document.body;
    const btnTema = document.getElementById('btnTema');
    const form = document.querySelector('form');

    // === 2. FUNCION: GENERAR TABLA DINÁMICAMENTE (Parte 2) ===
    const renderizarTabla = (fandomResaltado = "") => {
        if (!tablaCuerpo) return;
        tablaCuerpo.innerHTML = "";

        listaUsuariosUobras.forEach(item => {
            const fila = document.createElement('tr');

            // Resaltar si el fandom coincide (usamos valor del select)
            if (fandomResaltado && item.fandom.toLowerCase().includes(fandomResaltado.toLowerCase())) {
                fila.classList.add('table-warning');
            }

            fila.innerHTML = `
                <td>${item.titulo}</td>
                <td>${item.fandom}</td>
                <td>${item.autor}</td>
                <td><span class="badge ${item.estado === 'Completo' ? 'bg-success' : 'bg-warning text-dark'}">${item.estado}</span></td>
                <td><i class="bi bi-eye text-muted hover-dorado"></i></td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    };

    // Renderizado inicial
    renderizarTabla();

    // === 3. GESTIÓN DE TEMA (MODO OSCURO) ===
    const aplicarTema = (esClaro) => {
        if (esClaro) {
            body.classList.add('claro');
            if (btnTema) {
                btnTema.innerHTML = '<i class="bi bi-moon-stars me-2"></i>Modo Oscuro';
                btnTema.classList.replace('btn-borde-dorado', 'btn-outline-dark');
            }
        } else {
            body.classList.remove('claro');
            if (btnTema) {
                btnTema.innerHTML = '<i class="bi bi-brightness-high me-2"></i>Modo Claro';
                btnTema.classList.replace('btn-outline-dark', 'btn-borde-dorado');
            }
        }
    };

    let temaGuardado = localStorage.getItem('modoClaro') === 'true';
    aplicarTema(temaGuardado);

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const ahoraEsClaro = !body.classList.contains('claro');
            aplicarTema(ahoraEsClaro);
            localStorage.setItem('modoClaro', ahoraEsClaro);
        });
    }

    // === 4. NOTIFICACIÓN BOTÓN LIMPIAR ===
    const btnLimpiar = document.getElementById('btnLimpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            const el = document.getElementById('toastLimpiar');
            if (el) new bootstrap.Toast(el).show();
        });
    }

    // === 5. VALIDACIONES Y ENVÍO (Parte 1 y 2 combinadas) ===
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura de valores
            const tituloVal = document.getElementById('titulo').value;
            const emailVal = document.getElementById('email').value;
            const fandomSelect = document.getElementById('fandomSelect');
            const fandomVal = fandomSelect.options[fandomSelect.selectedIndex].text; // Capturamos el texto legible
            const sinopsisVal = document.getElementById('sinopsis').value;
            const esWip = document.getElementById('wipCheck').checked;

            // VALIDACIÓN 1: Caracteres especiales
            const regexAlphaNum = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;
            if (!regexAlphaNum.test(tituloVal)) {
                mostrarError("El título no permite caracteres especiales.");
                return;
            }

            // VALIDACIÓN 2: Selección de Fandom
            if (fandomSelect.value === "") {
                mostrarError("Por favor, selecciona un Fandom válido.");
                return;
            }

            // VALIDACIÓN 3: Longitud de Sinopsis
            if (sinopsisVal.trim().length < 20) {
                mostrarError("La sinopsis es demasiado corta (mínimo 20 caracteres).");
                return;
            }

            // --- ÉXITO: GUARDADO Y ACTUALIZACIÓN ---
            const nuevaObra = {
                titulo: tituloVal,
                fandom: fandomVal,
                autor: emailVal.split('@')[0], // Usamos el nombre del email como autor
                estado: esWip ? "WIP" : "Completo"
            };

            listaUsuariosUobras.push(nuevaObra);

            // Requisito: Mostrar tabla en consola
            console.log("Nueva obra registrada con éxito:");
            console.table(listaUsuariosUobras);

            // Actualizamos la tabla resaltando el nuevo fandom
            renderizarTabla(fandomVal);

            // Mostrar Toast de éxito
            const elEnvio = document.getElementById('toastEnvio');
            if (elEnvio) new bootstrap.Toast(elEnvio).show();

            // Resetear formulario
            setTimeout(() => { form.reset(); }, 2000);
        });
    }

    // FUNCIÓN AUXILIAR PARA ERRORES
    function mostrarError(mensaje) {
        const elError = document.getElementById('toastError');
        const txtError = document.getElementById('mensajeErrorTexto');
        if (elError && txtError) {
            txtError.textContent = mensaje;
            new bootstrap.Toast(elError).show();
        }
    }
});