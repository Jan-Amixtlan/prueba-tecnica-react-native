# Prueba Técnica – Desarrollador con habilidades en Aplicaciones Móviles (React Native / Expo)

## OBJETIVO 
Evaluar la capacidad del candidato para diseñar y desarrollar una aplicación móvil funcional, estructurada y usable, utilizando React Native con Expo, bajo un
escenario multi-empresa, priorizando la correcta implementación técnica y la
experiencia básica de usuario.

## ✅ Requisitos Cumplidos

### 1. Selección de Empresa
- Pantalla inicial con 3 empresas (Empresa 1, Empresa 2, Empresa 3).
- Cada empresa tiene un color principal distinto.
- Colores aplicados consistentemente en encabezados y elementos UI.

### 2. Inicio de Sesión por Empresa
- Pantalla de login con validación de credenciales correo y conttraseña.
- Usuarios simulados por empresa.
- Mensajes de error para credenciales incorrectas.
- Persistencia de sesión.

### 3. Home y Menú de Navegación
- Pantalla de bienvenida posterior al inicio de sesión.
- Menú de navegación con tabs (Inicio, Perfil, Configuración).
- Diseño responsivo y usable.

### 4. Perfil de Usuario
- Visualización de nombre, email y empresa.
- Cambio de foto de perfil desde el dispositivo.
- Edición de datos básicos del usuario.
- Guardado local de información.

### 5. Cierre de Sesión
- Opción clara para cerrar sesión.
- Limpieza completa de la sesión activa.
- Redirección a pantalla de selección de empresa.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18 o superior
  Verifique con: `node --version`
- npm (viene con Node.js)
  Verifique con: `npm --version`
- Expo Go instalado en dispositivo móvil
- Conexión a internet para descargar dependencias

### Pasos de Instalación
```bash
1. Abrir Visual Studio Code (o tu entorno preferido)

2. Abrir terminal integrada
En VS Code: Terminal → New Terminal (Ctrl + oCmd + )
O usa tu terminal/consola favorita

Ejecutar los siguientes comandos.
3. Clonar el repositorio
git clone https://github.com/TU-USUARIO/prueba-tecnica-react-native.git

4. Ingresar a la carpeta
cd prueba-tecnica-react-native

5. Instalar todas las dependencias necesarias
npm install

6. Ejecutar el servidor de desarrollo
npx expo start
# En caso de requeri limpiar cache
npx expo start --clear


# Si usa Mac y quiere probar en iOS Simulator
npm install -g ios-sim

7. Luego:
Escanear el código QR con Expo Go (App Store / Play Store)
La app se cargará automáticamente en su teléfono

```
🔐 Credenciales para Inicio de Sesión (Datos de Prueba)
| Email               | Contraseña |  Empresa  |
|---------------------|------------|-----------|
| leonel@empresa1.com | 123456     | Empresa 1 |
| ambar@empresa2.com  | 123456     | Empresa 2 |
| carlos@empresa3.com | 123456     | Empresa 3 |

