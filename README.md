# 🚀 MERN App - Aplicación de E-Commerce con Autenticación JWT

Una aplicación full-stack moderna construida con el stack MERN (MongoDB, Express, React, Node.js) que implementa un sistema completo de gestión de productos con autenticación segura mediante JWT.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos de Datos](#modelos-de-datos)
- [Endpoints de API](#endpoints-de-api)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Estado del Proyecto](#estado-del-proyecto)
- [Licencia](#licencia)

---

## ✨ Características

✅ **Autenticación y Autorización**
- Registro de usuarios con validación de email único
- Autenticación con JWT (JSON Web Tokens)
- Contraseñas hasheadas con bcryptjs
- Middleware de protección de rutas

✅ **Gestión de Productos**
- CRUD completo para productos (Crear, Leer, Actualizar, Eliminar)
- Búsqueda y paginación de productos
- Carga de imágenes asociadas a productos
- Validación de entrada robusta

✅ **Seguridad**
- Helmet para headers HTTP seguros
- Validación de entrada con express-validator
- Manejo centralizado de errores
- Soporte CORS

✅ **Logging y Monitoreo**
- Morgan para logging de HTTP requests
- Manejo completo de errores personalizado
- Stack traces en desarrollo

---

## 🛠 Stack Tecnológico

### Backend
| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Runtime | Node.js | v18+ |
| Framework | Express.js | 5.2.1 |
| ODM/Base de Datos | Mongoose | 9.4.1 |
| Autenticación | JWT | 9.0.3 |
| Hashing | bcryptjs | 3.0.3 |
| Validación | express-validator | 7.3.2 |
| Upload de Archivos | multer | 2.1.1 |
| Seguridad | helmet | 8.1.0 |
| Logging | morgan | 1.10.1 |
| CORS | cors | 2.8.6 |
| Dev | nodemon | 3.1.14 |

### Base de Datos
- **MongoDB** - Base de datos NoSQL (local o Atlas)

### Frontend
- **React** - (Próxima implementación)

---

## 📦 Instalación

### Requisitos Previos
- Node.js v18 o superior
- npm o yarn
- MongoDB (local o conexión a MongoDB Atlas)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd mern-app-example
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

3. **Instalar dependencias del frontend** (cuando esté disponible)
```bash
cd frontend
npm install
```

---

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de Datos
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/mern-app

# JWT
JWT_SECRET=tu-clave-secreta-muy-segura
JWT_EXPIRES_IN=1d

# Servidor
NODE_ENV=development
PORT=5000

# Uploads
MAX_FILE_SIZE=5242880  # 5MB en bytes
```

---

## 📁 Estructura del Proyecto

```
mern-app-example/
│
├── README.md
│
└── backend/
    ├── server.js                      # Punto de entrada
    ├── package.json                   # Dependencias y scripts
    ├── .env                          # Variables de entorno
    │
    ├── src/
    │   ├── app.js                    # Configuración de Express
    │   │
    │   ├── controllers/
    │   │   └── authController.js     # Lógica de autenticación
    │   │
    │   ├── models/
    │   │   ├── User.js               # Schema de Usuario
    │   │   └── Product.js            # Schema de Producto
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js         # Rutas de autenticación
    │   │   └── productRoutes.js      # Rutas de productos
    │   │
    │   ├── middlewares/
    │   │   ├── authMiddleware.js     # Verificación de JWT
    │   │   ├── errorHandler.js       # Manejo global de errores
    │   │   ├── validate.js           # Procesador de validaciones
    │   │   ├── uploadMiddleware.js   # Configuración de multer
    │   │   └── notFound.js           # Handler de 404
    │   │
    │   ├── validators/
    │   │   ├── authValidators.js     # Validaciones de auth
    │   │   └── productValidators.js  # Validaciones de productos
    │   │
    │   ├── database/
    │   │   └── conection.js          # Conexión a MongoDB
    │   │
    │   └── utils/
    │       ├── appError.js           # Clase de error personalizado
    │       ├── asyncHandler.js       # Wrapper para async/await
    │       └── httpCodes.js          # Constantes de códigos HTTP
    │
    └── uploads/                      # Carpeta para archivos subidos
```

---

## 💾 Modelos de Datos

### Schema de Usuario

```javascript
{
  _id: ObjectId,
  name: String (3-50 caracteres, requerido),
  email: String (único, lowercase, requerido),
  password: String (hasheado, mínimo 6 caracteres),
  createdAt: Date,
  updatedAt: Date
}
```

**Métodos:**
- `comparePassword(inputPassword)` - Compara contraseña con hash almacenado
- `toJSON()` - Retorna usuario sin la contraseña

### Schema de Producto

```javascript
{
  _id: ObjectId,
  name: String (2-100 caracteres, requerido),
  description: String (máximo 1000 caracteres, requerido),
  price: Number (≥ 0, requerido),
  stock: Number (≥ 0, por defecto 0),
  image: String (URL de imagen, opcional),
  createdBy: ObjectId (referencia a Usuario, indexado),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 Endpoints de API

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Segura123"
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Segura123"
}
```

### Productos

#### Listar Productos (con paginación y búsqueda)
```http
GET /api/products?page=1&limit=10&search=laptop
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Laptop Dell",
      "description": "Laptop de alto rendimiento",
      "price": 899.99,
      "stock": 5,
      "image": "uploads/1619827200000-laptop.jpg",
      "createdBy": "507f1f77bcf86cd799439011"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

#### Obtener Producto por ID
```http
GET /api/products/:id
Authorization: Bearer <token>
```

#### Crear Producto
```http
POST /api/products
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData:
  - name: "Laptop Dell"
  - description: "Laptop de alto rendimiento"
  - price: 899.99
  - stock: 5
  - image: <archivo>
```

#### Actualizar Producto
```http
PUT /api/products/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData:
  - name: "Laptop Dell XPS"
  - price: 1099.99
  - ... (solo los campos a actualizar)
```

#### Eliminar Producto
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

---

## 🚀 Cómo Ejecutar

### Desarrollo

1. **Navegar a la carpeta backend**
```bash
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env con las variables mencionadas en Configuración
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Producción

```bash
npm start
```

---

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Modelos de base de datos (User, Product)
- [x] Controlador de autenticación (función register)
- [x] Stack de middlewares (auth, error, validación, uploads)
- [x] Validadores de entrada (auth y products)
- [x] Configuración de conexión a MongoDB
- [x] Funciones utilitarias (async wrapper, custom errors, HTTP codes)
- [x] Configuración de seguridad (Helmet, CORS)

### 🔄 En Progreso / Por Hacer
- [ ] Implementar `server.js` y inicialización de Express
- [ ] Implementar `app.js` con rutas y middlewares
- [ ] Crear rutas de autenticación
- [ ] Crear rutas de productos
- [ ] Implementar controlador de login
- [ ] Implementar controladores CRUD de productos
- [ ] Desarrollo del frontend con React
- [ ] Tests unitarios e integración
- [ ] Documentación de API (Swagger/OpenAPI)
- [ ] Deployment (Heroku, AWS, etc.)

### 🐛 Problemas Conocidos / Typos a Corregir
- ⚠️ `authMiddleware.js`: 'Bearger' → 'Bearer'
- ⚠️ `errorHandler.js`: Parámetro 'eror' → 'error'
- ⚠️ `uploadMiddleware.js`: 'dickStorage' → 'diskStorage'
- ⚠️ `uploadMiddleware.js`: 'startsWhit' → 'startsWith'
- ⚠️ `authValidators.js`: '.whitMessage' → '.withMessage'
- ⚠️ `productValidators.js`: '.whitMessage' → '.withMessage'

---

## 📝 Requisitos de Validación

### Autenticación
- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato válido, único en BD
- **Contraseña**: Mínimo 8 caracteres, debe incluir mayúscula y número

### Productos
- **Nombre**: 2-100 caracteres
- **Descripción**: 5-500 caracteres
- **Precio**: Mayor o igual a 0
- **Stock**: Entero mayor o igual a 0
- **Imagen**: Máximo 5MB, solo formatos de imagen

---

## 🔐 Seguridad

- Las contraseñas se hashean con bcryptjs (10 rounds de salt)
- JWT tiene expiración de 1 día (configurable)
- Helmet protege contra vulnerabilidades HTTP comunes
- CORS habilitado para acceso seguro desde el frontend
- Validación robusta de entrada en todas las rutas
- Manejo centralizado de errores sin exposición de datos sensibles

---

## 🤝 Contribuir

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📞 Soporte

Para reportar bugs o solicitar features, por favor abre un issue en el repositorio.

---

**Última actualización**: 22 de abril de 2026
**Versión**: 0.1.0 (Development)