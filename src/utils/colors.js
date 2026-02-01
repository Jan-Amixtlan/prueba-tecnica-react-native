export const companyColors = {
  empresa1: {
    primary: '#2196F3',    // Azul corporativo (Microsoft, LinkedIn)
    secondary: '#1976D2',  // Azul más oscuro
    light: '#E3F2FD',      // Azul claro para fondos
    dark: '#0D47A1',       // Azul marino para acentos
    gradient: ['#2196F3', '#1976D2'] // Gradiente profesional
  },
  empresa2: {
    primary: '#4CAF50',    // Verde empresarial (Slack, Spotify)
    secondary: '#388E3C',  // Verde forestal
    light: '#E8F5E9',      // Verde claro para fondos
    dark: '#1B5E20',       // Verde oscuro para acentos
    gradient: ['#4CAF50', '#388E3C']
  },
  empresa3: {
  primary: '#FF9800',    // Naranja Material Design
  secondary: '#F57C00',  // Naranja oscuro
  light: '#FFF3E0',      // Naranja claro para fondos
  dark: '#E65100',       // Naranja intenso para acentos
  gradient: ['#FF9800', '#F57C00']
},
};

// Función para obtener colores de empresa
export const getCompanyColor = (companyId) => {
  return companyColors[companyId] || companyColors.empresa1;
};