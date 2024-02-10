import './App.css'
import Header from './components/Header'
import CreateBook from './components/CreateBook'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MySavedBooks from './components/MySavedBooks';


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CreateBook />} exact />
          <Route path="/mybooks" element={<MySavedBooks />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
