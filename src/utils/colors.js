export const companyColors = {
  empresa1: {
    primary: '#FF6B6B',    // Rojo coral
    secondary: '#FF8E8E',
    light: '#FFDADA'
  },
  empresa2: {
    primary: '#4ECDC4',    // Turquesa
    secondary: '#88D3CE',
    light: '#D1F0EE'
  },
  empresa3: {
    primary: '#FFD166',    // Amarillo
    secondary: '#FFDE8A',
    light: '#FFF4D9'
  }
};

// Función para obtener colores de empresa
export const getCompanyColor = (companyId) => {
  return companyColors[companyId] || companyColors.empresa1;
};