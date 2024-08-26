// src/App.jsx
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import MomentList from './components/MomentList/MomentList';
import MomentDetails from './components/MomentDetails/MomentDetails';
import MomentForm from './components/MomentForm/MomentForm'; // Import MomentForm

import * as authService from '../src/services/authService'; 
import * as momentService from './services/momentService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [moments, setMoments] = useState([]);

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
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;


