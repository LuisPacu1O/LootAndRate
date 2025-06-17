
🎮 Loot&Rate
Loot&Rate es una aplicación web para gestionar tus videojuegos: los que has completado, estás jugando, quieres jugar o has abandonado. Además, puedes calificarlos y escribir reseñas personalizadas.

🚀 Características principales
Registro y autenticación de usuarios
Crea una cuenta y accede a todas las funcionalidades de la aplicación.

Búsqueda avanzada de juegos
Encuentra tus videojuegos favoritos filtrando por nombre, género, plataforma, distribuidor o desarrollador.

Detalles completos de cada juego
Accede a una vista detallada con toda la información relevante del videojuego.

Puntuaciones y reseñas
Valora los juegos que has jugado, añade reseñas personalizadas y guárdalos en tu perfil para editarlos o consultarlos más adelante.

Estadísticas del perfil
Revisa todos tus juegos por estado, horas jugadas o nota. También podrás ver tus estadísticas generales: horas jugadas, juegos completados y número de reseñas escritas.

Diseño moderno y responsive
Interfaz atractiva y adaptada tanto a dispositivos móviles como a escritorio.

🛠 Instalación y ejecución
Clona el repositorio:

bash
Copiar
Editar
git clone <url-del-repo>
cd frontend
Instala las dependencias:

bash
Copiar
Editar
npm install
Ejecuta la app en modo desarrollo:

bash
Copiar
Editar
npm run dev
Abre tu navegador:
Visita http://localhost:5173 (o el puerto indicado en la terminal).

🧭 Guía de uso
✅ Registro y login
Haz clic en "Regístrate" para crear una cuenta.

Completa el formulario con tus datos y contraseña.

Accede con tus credenciales desde la pantalla de login.

🎮 Juegos y reseñas
Desde la página principal, busca un juego por nombre o filtra según tus preferencias.

Haz clic en un juego para acceder a su vista detallada.

Escribe o edita tu reseña, y haz clic en "Save".

Serás redirigido a tu perfil, donde podrás gestionar todas tus reseñas y juegos.

👤 Perfil de usuario
Library: Lista de todos tus juegos, con opciones para ordenarlos por estado, horas jugadas o nota.

Reviews: Visualiza, edita o elimina tus reseñas.

Stats: Consulta tus estadísticas generales (juegos completados, horas jugadas, reseñas escritas).

📁 Estructura del proyecto
bash
Copiar
Editar
src/
├── components/      # Componentes reutilizables (NavBar, CardGame, Input, etc.)
├── pages/           # Vistas principales (Home, Register, Login, Profile, GameDetails)
├── api/             # Servicios de comunicación con el backend
├── context/         # Contextos globales (autenticación, modales)
🧰 Tecnologías utilizadas
React 19

Vite

Material UI

SweetAlert2

React Hook Form + Yup

🔗 Notas importantes
El backend debe estar disponible en:
https://lootandrate.onrender.com

Las imágenes de perfil y las reseñas se almacenan en la base de datos junto con el perfil del usuario.
