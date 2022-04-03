
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import MainContext from "./context/userContext";
import {useState} from "react";
import ThreadViewPage from "./pages/ThreadViewPage";
import CreateNewTopic from "./components/createNewTopic/createNewTopic";
import CommentViewPage from "./pages/CommentViewPage";
function App() {

  const [getUser, setUser] = useState(null);


  return (
      <BrowserRouter>
    <div className="contentDiv">
      <MainContext.Provider
          value={{
            getUser,
            setUser
          }}
      >
      <Header/>


        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/thread/:index' element={<ThreadViewPage />} />
          <Route path='/topic/:index' element={<CommentViewPage />} />
          <Route path='/createtopic/:index' element={<CreateNewTopic />} />
          {/*<Route path='*' element={<ErrorPageNotFound />} />*/}
        </Routes>



        <Footer />
      </MainContext.Provider>
    </div>
      </BrowserRouter>
  );
}

export default App;
