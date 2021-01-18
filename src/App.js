import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

import Header from './components/Header';
import Footer from './components/Footer';

import { AuthProvider } from './contexts/AuthContext';
import { MenuToggleProvider } from './contexts/MenuToggleContext';

import PrivateRoute from './utils/PrivateRoute';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MenuToggleProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/user/:displayName" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>
            <Footer />
          </MenuToggleProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
