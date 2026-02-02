export const mockUsers = {
  empresa1: [
    { 
      email: 'leonel@empresa1.com', 
      password: '123456', 
      name: 'Leonel Gomez García',
      company: 'Empresa 1'
    }
  ],
  empresa2: [
    { 
      email: 'ambar@empresa2.com', 
      password: '123456', 
      name: 'Ámbar Estrada Ruiz',
      company: 'Empresa 2'
    }
  ],
  empresa3: [
    { 
      email: 'carlos@empresa3.com', 
      password: '123456', 
      name: 'Carlos López Gallejo',
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