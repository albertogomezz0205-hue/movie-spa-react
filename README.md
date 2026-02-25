#  Movie SPA

Aplicación SPA desarrollada con React + TypeScript que permite buscar películas usando la API de OMDb, aplicar filtros avanzados, guardar favoritos y explorar resultados mediante scroll infinito.

---

##  Demo

 Live Demo: https://movie-spa-react-app.vercel.app

---

##  Tecnologías utilizadas

- React
- TypeScript
- Vite
- OMDb API
- LocalStorage
- IntersectionObserver API

---

##  Funcionalidades

- Búsqueda por título
- Filtros avanzados (tipo: movie, series, episode + año)
- Scroll infinito con IntersectionObserver
- Gestión de favoritos persistente en localStorage
- Ordenación de favoritos (A-Z / Fecha de agregado)
- Modal accesible (cierre con ESC + atributos ARIA)
- Skeleton loader animado para mejorar la experiencia de usuario
- Arquitectura organizada por responsabilidades

---

##  Arquitectura del proyecto

```
src/
 components/
 hooks/
 services/
 utils/
 App.tsx
```

### Custom Hooks

- `useMovies` → Maneja búsqueda, paginación e implementación de scroll infinito.
- `useFavorites` → Maneja la lógica de favoritos y persistencia en localStorage.

### Services

- `omdbService.ts` → Centraliza las llamadas a la API.

### Utils

- `sortFavorites.ts` → Lógica desacoplada para ordenación.

---

##  Decisiones técnicas

### Scroll infinito
Se implementó utilizando `IntersectionObserver` para detectar cuándo el último elemento visible entra en el viewport y cargar automáticamente la siguiente página de resultados.

Esto permite:
- Mejor experiencia de usuario
- Interfaz más moderna
- Eliminación de paginación manual

---

### Persistencia de datos
Los favoritos se almacenan en `localStorage` permitiendo mantener el estado incluso después de recargar la página.

---

### Accesibilidad
El modal incluye:
- role="dialog"
- aria-modal
- aria-labelledby
- Cierre con tecla ESC
- Gestión de foco al abrir

---

##  Instalación y ejecución

```bash
npm install
npm run dev
```

---

##  Variables de entorno


```
VITE_OMDB_API_KEY=tu_api_key
```


---

##  Build de producción

```bash
npm run build
```

---

##  Mejoras futuras

- Tipado más estricto eliminando completamente `any`
- Tests unitarios
- Mejoras adicionales de diseño responsive
- Optimización de rendimiento
- Implementación de debounce en la búsqueda

---

Actividad #2 – Desestructuración y Deep Copy
Descripción

Esta actividad demuestra el manejo de objetos y arreglos anidados en JavaScript, aplicando el concepto de inmutabilidad mediante una copia profunda (deep copy).

El objetivo es crear un nuevo arreglo a partir de uno original, modificar múltiples campos del arreglo copiado y comprobar que el objeto original no se ve afectado.

Ubicación del archivo:
La solución se encuentra en el archivo:

jsonActivity2.js

Tecnologías utilizadas:

-JavaScript (ES6+)

-Node.js (para ejecución en consola)

Decisión técnica: structuredClone

Para realizar la copia profunda del arreglo se utilizó la API nativa structuredClone ya que:

-Realiza una copia profunda incluyendo objetos anidados.

-Evita compartir referencias entre el objeto original y el copiado.

-Garantiza la inmutabilidad del arreglo original.

-Esto permite modificar el arreglo copiado sin riesgo de alterar los datos originales.

Cómo ejecutarlo

Desde la raíz del proyecto, ejecutar el siguiente comando en la terminal:

node jsonActivity2.js

---

##  Autor Carlos Alberto G

Proyecto desarrollado como prueba técnica.