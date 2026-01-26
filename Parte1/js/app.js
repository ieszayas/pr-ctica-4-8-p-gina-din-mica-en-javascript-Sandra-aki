document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTIÓN DE TEMA ---
    const btnTema = document.getElementById('btnTema');
    const body = document.body;

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

    // --- 2. NOTIFICACIÓN BOTÓN LIMPIAR ---
    const btnLimpiar = document.getElementById('btnLimpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            const el = document.getElementById('toastLimpiar');
            if (el) new bootstrap.Toast(el).show();
        });
    }

    // --- 3. VALIDACIONES Y ENVÍO ---
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Referencias a posibles campos (para Login u Obras)
            const campoUser = document.getElementById('user') || document.getElementById('titulo');
            const campoPass = document.getElementById('pass') || document.getElementById('sinopsis');
            const campoFandom = document.getElementById('fandomSelect');

            // VALIDACIÓN 1: Caracteres especiales en el campo principal (User o Título)
            const regexAlphaNum = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;
            if (campoUser && !regexAlphaNum.test(campoUser.value)) {
                mostrarError("No se permiten caracteres especiales en el campo Titulo / Usaurio.");
                return;
            }

            // VALIDACIÓN 2: Selección de Fandom (si existe el select)
            if (campoFandom && (campoFandom.value === "" || campoFandom.value.includes("Selecciona"))) {
                mostrarError("Por favor, selecciona un Fandom válido.");
                return;
            }

            // VALIDACIÓN 3: Longitud mínima (Contraseña o Sinopsis)
            const minLen = campoPass && campoPass.type === "password" ? 8 : 20;
            if (campoPass && campoPass.value.trim().length < minLen) {
                mostrarError(`El campo contraseña / Sinopsis es demasiado corto (mínimo ${minLen} caracteres).`);
                return;
            }

            // --- ÉXITO ---
            const elEnvio = document.getElementById('toastEnvio');
            if (elEnvio) {
                const toastEnvio = new bootstrap.Toast(elEnvio, { delay: 4000 });
                toastEnvio.show();

                const btnSubmit = form.querySelector('[type="submit"]');
                btnSubmit.disabled = true;

                setTimeout(() => {
                    form.submit(); // O form.reset() si prefieres que no recargue
                }, 4000);
            }
        });
    }

    // FUNCIÓN PARA MOSTRAR ERRORES EN TOAST
    function mostrarError(mensaje) {
        const elError = document.getElementById('toastError');
        const txtError = document.getElementById('mensajeErrorTexto');
        if (elError && txtError) {
            txtError.textContent = mensaje;
            new bootstrap.Toast(elError).show();
        }
    }
});