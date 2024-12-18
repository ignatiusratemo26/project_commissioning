import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [redirect, setRedirect] = useState(null);

    useEffect(()=> {
        const token = localStorage.getItem('accessToken');
        if (token) {
        try {
            const decodedToken = jwtDecode(token); // Decode token to check expiry
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token to all requests
            // setUser(decodedToken); // Optionally decode the token for user details
            const savedUserDetails = localStorage.getItem('userDetails');
            if (savedUserDetails) {
            setUser(JSON.parse(savedUserDetails));
            
            }

            setReady(true);
            } else {
            // Token expired
            localStorage.removeItem('accessToken');
            console.warn('Access token expired. Please log in again.');
            setReady(true);
            }
        } catch (err) {
            console.error('Failed to validate token:', err);
            localStorage.removeItem('accessToken'); // Clear invalid token
            setReady(true);
        }
        } else {
        setReady(true); // No token, app is ready for unauthenticated users
        }


        const interval = setInterval(() => {
            const token = localStorage.getItem('accessToken');
            if (token) {
              const decodedToken = jwtDecode(token);
              const currentTime = Date.now() / 1000;
        
              // Refresh token if it's about to expire (e.g., within 1 minute)
              if (decodedToken.exp - currentTime < 60) {
                axios.post('/token/refresh/', { refresh: localStorage.getItem('refreshToken') })
                  .then(({ data }) => {
                    localStorage.setItem('accessToken', data.access);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                  })
                  .catch(err => {
                    console.error('Failed to refresh token:', err);
                    logout();
                    
                  });
              }
            }
          }, 60000); // Check every 60 seconds
        
          return () => clearInterval(interval);


    }, []);

    const login = async (credentials) => {
        try {
          // Retrieve tokens from the backend
          const { data } = await axios.post('/token/', credentials);
      
          // Save tokens in localStorage
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
      
          // Set Authorization header for API requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      
          // Decode the access token
          const decodedToken = jwtDecode(data.access);
      
          // Fetch user details from backend using user_id
          const userResponse = await axios.get(`/users/${decodedToken.user_id}/`);
          const userDetails = userResponse.data;
          localStorage.setItem('userDetails', JSON.stringify(userDetails));


      
          // Save user details in the context
          setUser({ ...userDetails });
          setRedirect('/'); // Optional redirect logic
        } catch (err) {
          console.error('Login failed:', err.message || err);
          throw err;
        }
      };
      

    // Logout Function
    // const logout = () => {
    //   await axios.post('/logout/', { refresh: localStorage.getItem('refreshToken') });
    //     localStorage.removeItem('accessToken');
    //     delete axios.defaults.headers.common['Authorization'];
    //     setUser(null);
    // };
    const logout = async () => {
      try {
        await axios.post('/logout/', { refresh: localStorage.getItem('refreshToken') });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return (
        <UserContext.Provider value={{user, setUser, ready, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}