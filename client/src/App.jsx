import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import CreateBook from './components/CreateBook'
import MySavedBooks from './components/MySavedBooks';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createBook" element={<CreateBook />} />
          <Route path="/mybooks" element={<MySavedBooks />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
