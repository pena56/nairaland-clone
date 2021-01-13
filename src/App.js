import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn.js';
import { AuthProvider } from './contexts/AuthContext';
import { MenuToggleProvider } from './contexts/MenuToggleContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MenuToggleProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={Profile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
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
