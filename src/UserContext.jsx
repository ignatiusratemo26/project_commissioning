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
            setUser(decodedToken); // Optionally decode the token for user details
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
    }, []);

    const login = async (credentials) => {
      try {
        // Make API call to retrieve tokens
        const { data } = await axios.post('/token/', credentials);
    
        // Check if tokens exist in the response
        if (!data.access || typeof data.access !== 'string') {
          throw new Error('Invalid access token received from server');
        }
    
        // Save tokens to localStorage or cookies
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
    
        // Set the Authorization header for future API requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    
        // Decode the access token to extract user information
        const decodedToken = jwtDecode(data.access);
        console.log('Decoded Token:', decodedToken); // For debugging
    
        // Set the user in the context
        setUser(decodedToken);
        setRedirect('/');
      } catch (err) {
        console.error('Login failed:', err.message || err);
        throw err;
      }
    };
    

    // Logout Function
    const logout = () => {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };
    return (
        <UserContext.Provider value={{user, setUser, ready, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}





// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { decode } from 'jwt-decode';

// export const UserContext = createContext();

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Load token from localStorage and validate it
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       try {
//         const decodedToken = decode(token); // Decode token to check expiry
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp > currentTime) {
//           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token to all requests
//           setUser(decodedToken); // Optionally decode the token for user details
//           setReady(true);
//         } else {
//           // Token expired
//           localStorage.removeItem('accessToken');
//           console.warn('Access token expired. Please log in again.');
//           setReady(true);
//         }
//       } catch (err) {
//         console.error('Failed to validate token:', err);
//         localStorage.removeItem('accessToken'); // Clear invalid token
//         setReady(true);
//       }
//     } else {
//       setReady(true); // No token, app is ready for unauthenticated users
//     }
//   }, []);

//   // Login Function
//   const login = async (credentials) => {
//     try {
//       const { data } = await axios.post('/api/token', credentials);
//       localStorage.setItem('accessToken', data.accessToken);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
//       const decodedToken = jwtDecode(data.accessToken);
//       setUser(decodedToken);
//     } catch (err) {
//       console.error('Login failed:', err);
//       throw err;
//     }
//   };

//   // Logout Function
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, ready, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
