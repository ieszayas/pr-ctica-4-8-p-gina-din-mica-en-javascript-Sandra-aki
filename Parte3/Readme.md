# Informe de Proyecto: Sistema de Gestión de Fanfics

Este proyecto es una plataforma interactiva para la gestión de obras literarias, desarrollada con HTML5, CSS3 (Bootstrap 5) y JavaScript Vanilla. Implementa persistencia de datos, validaciones avanzadas y manipulación dinámica del DOM.

---

## 1. Documentación de Funcionalidades

### Parte 01: Interfaz y Experiencia de Usuario
* **Gestión de Tema:** Sistema de cambio entre Modo Claro y Modo Oscuro con persistencia mediante `localStorage`.
* **Notificaciones No Intrusivas:** Implementación de componentes **Toast de Bootstrap** para confirmar acciones (limpieza de formulario, errores y envíos exitosos).
* **Validación de Formulario:** Control de entrada mediante expresiones regulares (Regex) para evitar caracteres especiales y control de longitud mínima en la sinopsis.

### Parte 02: Lógica de Datos
* **Generación Dinámica de Tabla:** La tabla se renderiza a partir de un array de objetos. No existen filas estáticas en el HTML.
* **Gestión de Objetos:** Al enviar el formulario correctamente, se crea un objeto JS, se añade al array global y se muestra el resultado en consola mediante `console.table()`.

### Parte 03: Interactividad Avanzada
* **Búsqueda Dinámica:** Filtro en tiempo real que oculta filas de la tabla según el texto ingresado.
* **Reloj Digital:** Indicador de tiempo real actualizado cada segundo.
* **Personalización Estética:** Selector de color que modifica el estilo visual de la tabla dinámicamente.
* **Contador de Caracteres:** Feedback visual sobre la extensión de la sinopsis en el formulario.

---

## 2. Tabla de Pruebas de Evaluación (QA)

| Funcionalidad | Acción Realizada | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- |
| **Persistencia Tema** | Cambiar a Modo Oscuro y recargar. | La página inicia en modo oscuro automáticamente. | Ok |
| **Botón Limpiar** | Clic en el botón "Limpiar". | Se vacían los inputs y aparece un Toast de aviso. | Ok |
| **Toast de Error** | Intentar enviar título con caracteres "@#$". | Aparece un Toast indicando que no se permiten símbolos. | Ok |
| **Validación de Envío** | Enviar formulario con datos válidos. | El botón se deshabilita temporalmente y se procesan los datos. | Ok |
| **Búsqueda Dinámica** | Escribir un Fandom existente en el buscador. | La tabla filtra y muestra solo las filas coincidentes. | Ok |

---

## 3. Guía de Depuración: Uso de Breakpoints

Para verificar el flujo de los datos en la **Parte 02**, se utilizó el depurador de las herramientas de desarrollador.

### Evidencia del Breakpoint

Documento Breakpoint.md subido.

**Funcionamiento del Breakpoint:**
1. Se seleccionó la línea de código donde se instancia el objeto `nuevaObra`.
2. Al pulsar "Publicar", la ejecución se detiene, permitiendo inspeccionar en el panel **Scope** que los valores de los inputs (título, fandom, autor) se han capturado correctamente.
3. Esto garantiza que el array final recibirá datos limpios y procesados.

---

## 4. Capturas de la Interfaz

### Interfaz Principal y Tabla Dinámica

<img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/38a2afca-25f7-48e8-b447-7436322106bc" />
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/849cfdf7-a3f8-41e2-a930-3bbf7814322a" />
<img width="1919" height="845" alt="image" src="https://github.com/user-attachments/assets/424b3d52-77bc-46d7-bccb-3f26d5e3dad6" />
<img width="1919" height="854" alt="image" src="https://github.com/user-attachments/assets/e102f93d-4ffb-470f-b0be-c47f4595d6c6" />
<img width="1919" height="847" alt="image" src="https://github.com/user-attachments/assets/e4f30280-8cbc-4de3-b768-d9af66573f25" />
<img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/3725a7bf-b164-4499-8196-c4e3bf80b707" />
<img width="1918" height="840" alt="image" src="https://github.com/user-attachments/assets/fae62fce-0287-41e0-9ec5-b0f009aa4725" />

Y con Modo Claro:

<img width="1919" height="862" alt="image" src="https://github.com/user-attachments/assets/9ada526e-04a5-4ea4-ba1c-9f8403ac4da4" />
<img width="1919" height="851" alt="image" src="https://github.com/user-attachments/assets/ddc9f178-70e7-4d0d-a7f3-52db09ddd6ee" />
<img width="1919" height="853" alt="image" src="https://github.com/user-attachments/assets/584acab9-f711-4229-9c6c-422afe00c93a" />
<img width="1919" height="856" alt="image" src="https://github.com/user-attachments/assets/b6d7b71f-56f8-4fc8-9e75-0cd7077578bf" />
<img width="1919" height="857" alt="image" src="https://github.com/user-attachments/assets/b04961fa-796c-4579-9e0b-3a95316cbe4d" />


*Descripción: Vista de la tabla generada dinámicamente y el formulario de entrada.*

---

## 5. Instrucciones de Instalación y Uso
1. **Clonación:** Clonar este repositorio o descargar los archivos fuente en una carpeta local.
2. **Ejecución:** Abrir el archivo `index.html` en cualquier navegador moderno (Chrome, Edge o Firefox).
3. **Persistencia:** Al cambiar el modo de color, puede cerrar el navegador y volver a abrirlo; el sistema recordará su preferencia gracias a `localStorage`.
4. **Auditoría:** Para verificar el manejo de objetos en la Parte 2, presione `F12`, diríjase a la pestaña **Console** y observe la impresión de `console.table()` tras cada registro exitoso.
