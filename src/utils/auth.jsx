export const register = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser && savedUser.email === email && savedUser.password === password;
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('auth') === 'true';
  };
  
  export const logout = () => {
    localStorage.setItem('auth', 'false');
  };
  