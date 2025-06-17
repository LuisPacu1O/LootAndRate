# 🎮 Loot&Rate

**Loot&Rate** es una aplicación web diseñada para que gestiones tus videojuegos: lleva un registro de los títulos que has **completado**, los que **estás jugando**, los que **quieres jugar** o los que has **abandonado**. Además, te permite **calificar** tus juegos y escribir **reseñas personalizadas**.

---

## 🚀 Características principales

### 🔐 Registro y autenticación de usuarios
Crea una cuenta para acceder a todas las funcionalidades de la aplicación.

### 🔎 Búsqueda avanzada de juegos
Encuentra tus videojuegos favoritos filtrando por **nombre**, **género**, **plataforma**, **distribuidor** o **desarrollador**.

### 📄 Detalles completos de cada juego
Accede a una vista detallada con toda la **información relevante** del videojuego.

### ⭐ Puntuaciones y reseñas
Valora los juegos que has jugado, añade **reseñas personalizadas** y guárdalas en tu perfil para editarlas o consultarlas más adelante.

### 📊 Estadísticas del perfil
Revisa todos tus juegos por **estado**, **horas jugadas** o **nota**. También podrás ver tus estadísticas generales: **horas jugadas**, **juegos completados** y **número de reseñas escritas**.

### 🖥️ Diseño moderno y responsive
Disfruta de una interfaz atractiva y **adaptada** tanto a dispositivos móviles como a escritorio.

---

## 🛠 Instalación y ejecución

### 1. Clona el repositorio
```bash
git clone <url-del-repo>
cd frontend
```

### 2. Instala las dependencias
```bash
npm install
```
### 3. Ejecuta la app en modo desarrollo

```bash
npm run dev
```
### 4. Abre tu navegador
Visita http://localhost:5173 (o el puerto indicado en la terminal).

## 🧭 Guía de uso

### ✅ Registro y login

Haz clic en "Regístrate" para crear una cuenta.
Completa el formulario con tus datos y contraseña.
Accede con tus credenciales desde la pantalla de login.

### 🎮 Juegos y reseñas

Desde la página principal, busca un juego por nombre o filtra según tus preferencias.
Haz clic en un juego para acceder a su vista detallada.
Escribe o edita tu reseña, y haz clic en "Save".
Serás redirigido a tu perfil, donde podrás gestionar todas tus reseñas y juegos.

### 👤 Perfil de usuario

Library: Lista de todos tus juegos, con opciones para ordenarlos por estado, horas jugadas o nota.
Reviews: Visualiza, edita o elimina tus reseñas.
Stats: Consulta tus estadísticas generales (juegos completados, horas jugadas, reseñas escritas).

## 📁 Estructura del proyecto
```bash
src/
├── components/      # Componentes reutilizables (NavBar, CardGame, Input, etc.)
├── pages/           # Vistas principales (Home, Register, Login, Profile, GameDetails)
├── api/             # Servicios de comunicación con el backend
├── context/         # Contextos globales (autenticación, modales)
```
## 🧰 Tecnologías utilizadas

javascript logo  nodejs logo  html5 logo  css3 logo  fastapi logo  fastapi logo

## 🔗 Notas importantes

El backend debe estar disponible en: https://lootandrate.onrender.com
Las imágenes de perfil y las reseñas se almacenan en la base de datos junto con el perfil del usuario.
