import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={'Welcome to iNotebook'} />
          <div className="container">

          <Routes>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>

          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
