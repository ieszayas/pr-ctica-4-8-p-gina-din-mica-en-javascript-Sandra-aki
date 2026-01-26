# Informe de Implementación: Parte 02 - JS Dinámico

## Descripción de la Solución
Se ha desarrollado un sistema interactivo que gestiona una lista de obras literarias utilizando JavaScript moderno (ES6). La solución integra validaciones de formulario, manipulación del DOM y gestión de estados mediante arrays de objetos.

### Características Principales:
* **Generación Dinámica:** La tabla se construye a partir de un array de objetos, eliminando la necesidad de escribir filas manuales en el archivo HTML.
* **Gestión de Datos:** Al enviar el formulario, los datos se capturan, se validan mediante expresiones regulares y se almacenan en una lista global.
* **Feedback Visual:** Se implementó una lógica de resaltado que utiliza clases de Bootstrap para identificar filas específicas basadas en la interacción del usuario con el formulario.

---

## Depuración y Breakpoints (Evidencia)

Para garantizar que la lógica de captura de datos sea correcta, se ha realizado una sesión de depuración utilizando las herramientas de desarrollador (DevTools).

### Captura del Debugger en Ejecución

Pasos para activar el Breakpoint:
1. Abre tu archivo HTML en el navegador.
2. Presionar F12 (o clic derecho -> Inspeccionar) y pestaña Sources (Fuentes).
3. En el panel de la izquierda, buscar y abrir archivo js/app.js.
4. Buscar la línea donde comienza la creación del objeto (const nuevaObra = {).
5. Clic justo sobre el número de la línea. Aparecerá una marca azul. Esto indica que el navegador se detendrá ahí.

<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/d937fe69-d652-4d91-9e11-624a80ef00ac" />
<img width="962" height="502" alt="image" src="https://github.com/user-attachments/assets/f6301b51-3a10-4c2a-91ab-26c200cc705f" />
<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/553494bf-f37f-4b16-9469-5261887d1e62" />


### Explicación técnica del Breakpoint:
1.  **Ubicación:** El punto de interrupción se colocó en la función de escucha del evento submit, específicamente en la línea de creación del objeto nuevaObra.
2.  **Estado de la Aplicación:** La ejecución se detiene justo antes de realizar la inserción al array. Esto permite inspeccionar la memoria local en tiempo real.
3.  **Inspección de Scope:** En el panel de Scope de las DevTools, se validó que:
    * El título recibe correctamente el texto del input tras pasar la validación Regex.
    * El fandom contiene el valor seleccionado del menú desplegable.
    * Los datos capturados coinciden exactamente con lo ingresado por el usuario.
4.  **Resultado:** Tras reanudar la ejecución, el objeto se integra al array y se refresca la vista de la tabla automáticamente sin necesidad de recargar la página.

---

## Visualización de Datos en Consola
Una vez procesado el envío, el array actualizado se imprime en la consola del desarrollador utilizando un formato estructurado para su auditoría:

<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/4dfc8263-59cd-4db1-8f11-c3f13c821364" />


```javascript
// Comando ejecutado en el código para visualización de datos
console.table(listaUsuariosUobras);
