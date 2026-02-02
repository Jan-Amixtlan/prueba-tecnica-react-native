# Prueba Técnica - Desarrollador Móvil React Native/Expo

## 📱 Descripción
Aplicación móvil multiempresa desarrollada con React Native y Expo que cumple con todos los requisitos de la prueba técnica: selección de empresa, autenticación, navegación, perfil de usuario y persistencia de datos.

## ✅ Requisitos Cumplidos

### 1. Selección de Empresa
- Pantalla inicial con 3 empresas (Empresa 1, Empresa 2, Empresa 3)
- Cada empresa tiene un color principal distinto
- Colores aplicados consistentemente en encabezados y elementos UI

### 2. Inicio de Sesión por Empresa
- Pantalla de login con validación de credenciales
- Usuarios simulados por empresa
- Mensajes de error para credenciales incorrectas
- Persistencia de sesión

### 3. Home y Menú de Navegación
- Pantalla de bienvenida post-login
- Menú de navegación con tabs (Inicio, Perfil, Configuración)
- Diseño responsivo y usable

### 4. Perfil de Usuario
- Visualización de nombre, email y empresa
- Cambio de foto de perfil desde el dispositivo
- Edición de datos básicos del usuario
- Guardado local de información

### 5. Cierre de Sesión
- Opción clara para cerrar sesión
- Limpieza completa de la sesión activa
- Redirección a pantalla de selección de empresa

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18 o superior
  Verifique con: `node --version`
- npm (viene con Node.js)
  Verifique con: `npm --version`
- Expo Go instalado en dispositivo móvil
- Conexión a internet para descargar dependencias

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/[TU-USUARIO]/prueba-tecnica-react-native.git

2. **Ingresar a la carpeta**
cd prueba-tecnica-react-native

3. **Instalar todas las dependencias necesarias**
npm install

# Si usa Mac y quiere probar en iOS Simulator
npm install -g ios-sim

3. **Ejecutar el servidor de desarrollo**
npx expo start
# En caso de requeri limpiar cache
npx expo start --clear

Luego:
Escanear el código QR con Expo Go (App Store / Play Store)
La app se cargará automáticamente en su teléfono
