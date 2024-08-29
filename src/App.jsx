// src/App.jsx
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import MomentDetails from './components/MomentDetails/MomentDetails';
import MomentForm from './components/MomentForm/MomentForm';
import MomentCalendar from './components/MomentCalendar/MomentCalendar';
import MomentsPage from './components/MomentsPage/MomentsPage';

import * as authService from './services/authService'; 
import * as momentService from './services/momentService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [moments, setMoments] = useState([]);
  const [isSigninOpen, setSigninOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const openSigninModal = () => {
    setSigninOpen(true);
    setSignupOpen(false);
  };
  
  const openSignupModal = () => {
    setSignupOpen(true);
    setSigninOpen(false);
  };

  const closeModals = () => {
    setSigninOpen(false);
    setSignupOpen(false);
  };

  useEffect(() => {
    const fetchAllMoments = async () => {
      const momentsData = await momentService.index();
      setMoments(momentsData);
    };
    if (user) fetchAllMoments();
  }, [user]);

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar 
        user={user} 
        handleSignout={handleSignout} 
        openSigninModal={openSigninModal} 
        openSignupModal={openSignupModal} 
      />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/moments" element={<MomentsPage />} />
            <Route path="/moments/:momentId" element={<MomentDetails />} />
            <Route 
              path="/moments/new" 
              element={<MomentForm />} 
            />
            <Route path="/calendar" element={<MomentCalendar moments={moments} showControls={true} />} />   
          </>
        ) : (
          <Route path="/" element={<Landing openSigninModal={openSigninModal} openSignupModal={openSignupModal} />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} onClose={closeModals} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} onClose={closeModals} />} />
      </Routes>

      {isSigninOpen && <SigninForm setUser={setUser} onClose={closeModals} />}
      {isSignupOpen && <SignupForm setUser={setUser} onClose={closeModals} />}
    </AuthedUserContext.Provider>
  );
};

export default App;