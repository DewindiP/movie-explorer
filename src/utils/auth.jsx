export const register = (user) => {  // Function to register a new user
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const login = (email, password) => { // Function to log in a user
    const savedUser = JSON.parse(localStorage.getItem('user'));
    // Check if the email and password match the stored user credentials
    return savedUser && savedUser.email === email && savedUser.password === password;
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = () => {
    return localStorage.getItem('auth') === 'true';
  };
  
  // export const logout = () => {
  //   localStorage.setItem('auth', 'false');
  // };
  