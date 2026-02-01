export const mockUsers = {
  empresa1: [
    { 
      email: 'usuario1@empresa1.com', 
      password: '123456', 
      name: 'Juan Pérez',
      company: 'Empresa 1'
    }
  ],
  empresa2: [
    { 
      email: 'usuario2@empresa2.com', 
      password: '123456', 
      name: 'María García',
      company: 'Empresa 2'
    }
  ],
  empresa3: [
    { 
      email: 'usuario3@empresa3.com', 
      password: '123456', 
      name: 'Carlos López',
      company: 'Empresa 3'
    }
  ]
};

// Validar las credenciales
export const validateCredentials = (company, email, password) => {
  const users = mockUsers[company];
  if (!users) return null;
  
  const user = users.find(u => 
    u.email === email && u.password === password
  );
  
  return user || null;
};