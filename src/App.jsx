// src/App.jsx
import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import MomentList from './components/MomentList/MomentList';
import * as momentService from './services/momentService';
import MomentDetails from './components/MomentDetails/MomentDetails';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [moments, setMoments] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllMoments = async () => {
      const momentsData = await momentService.index();
  
      // Set state:
      setMoments(momentsData);
    };
    if (user) fetchAllMoments();
  }, [user]);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
              <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/moments" element={<MomentList moments={moments} />} />
                <Route path="/moments/:momentId" element={<MomentDetails />} />
              </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
