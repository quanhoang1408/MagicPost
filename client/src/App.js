import { Fragment, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import * as userService from '~/services/userService';
import { useState } from 'react';
import Toast from './components/Toast';

export const authUserContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({});
  useEffect(() => {
    userService.getUserById()
      .then(data => {
        setAuthUser(data);
    })
  }, []);
  return (
    <authUserContext.Provider value={authUser}>
      <Toast>
        <Router>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
    
                let Layout = DefaultLayout
                if (route.layout) {
                  Layout = route.layout
                } else if (route.layout === null) {
                  Layout = Fragment
                }
    
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    } 
                  />
                )
              })}
            </Routes>
          </div>
        </Router>
      </Toast>
    </authUserContext.Provider>
  );
}

export default App;
