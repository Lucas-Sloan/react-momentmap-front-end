// src/App.jsx
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import MomentList from './components/MomentList/MomentList';
import MomentDetails from './components/MomentDetails/MomentDetails';
import MomentForm from './components/MomentForm/MomentForm';
import MomentCalendar from './components/MomentCalendar/MomentCalendar';

import * as authService from '../src/services/authService'; 
import * as momentService from './services/momentService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [moments, setMoments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllMoments = async () => {
      const momentsData = await momentService.index();
      setMoments(momentsData);
    };
    if (user) fetchAllMoments();
  }, [user]);

  const handleCreateMoment = async (momentData) => {
    const newMoment = await momentService.create(momentData);
    if (newMoment) {
      setMoments([...moments, newMoment]);
    }
  };

  const handleEditMoment = async (momentId, momentData) => {
    const updatedMoment = await momentService.update(momentId, momentData);
    if (updatedMoment) {
      setMoments(moments.map(moment => 
        moment._id === momentId ? updatedMoment : moment
      ));
    }
  };

  // Component to handle editing a moment
  const EditMomentPage = () => {
    const { momentId } = useParams();
    const moment = moments.find(m => m._id === momentId);

    return (
      <MomentForm 
        initialData={moment} 
        onSubmit={(momentData) => handleEditMoment(momentId, momentData)} 
      />
    );
  };

  // Component to handle the Google OAuth callback and store the JWT token
  const GoogleCallbackHandler = () => {
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (token) {
        localStorage.setItem('token', token); // Store the token
        setUser(authService.getUser()); // Set the user in context
        navigate('/calendar'); // Redirect to the calendar page
      } else {
        console.error('No token found in callback');
        navigate('/signin'); // Redirect to signin if something went wrong
      }
    }, [location, navigate]);

    return <p>Processing...</p>; // Optional loading state
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/moments" element={<MomentList moments={moments} />} />
            <Route path="/moments/:momentId" element={<MomentDetails />} />
            <Route 
              path="/moments/new" 
              element={<MomentForm onSubmit={handleCreateMoment} />} 
            />
            <Route 
              path="/moments/:momentId/edit" 
              element={<EditMomentPage />} 
            />
            <Route path="/calendar" element={<MomentCalendar />} />
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/auth/google/callback" element={<GoogleCallbackHandler />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;



