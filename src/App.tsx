import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { MainNavBar } from './cmps/MainNavBar';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { RootState, useAppDispatch } from './store/store';
import { loadShop } from './store/actions/shop';

export const App = () => {
  const currentShop = useSelector((app: RootState) => app.shopModule);
  const shopRef = useRef<RootState['shopModule']['data']>(currentShop.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!currentShop.data.id || currentShop.data.id !== shopRef.current.id) {
      dispatch(loadShop(currentShop.data.id));
      shopRef.current = currentShop.data;
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <AppHeader />
        <main className="main-app-wrapper">
          <MainNavBar />
          <section className="main-container">
            <Routes>
              {/* <Route element={<ProductsPage />} path={'products/*'} /> */}
              <Route element={<Home />} path={'/'} />
            </Routes>
          </section>
          {/* <DynamicDialog /> */}
        </main>
      </Router>
    </div>
  );
};
