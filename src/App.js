
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./footer/footer";
import Header from "./components/header/header";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
      <BrowserRouter>
    <div>
      <Header/>


        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/*<Route path='*' element={<ErrorPageNotFound />} />*/}
        </Routes>



        <Footer />
    </div>
      </BrowserRouter>
  );
}

export default App;
