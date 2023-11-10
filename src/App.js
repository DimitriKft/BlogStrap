import Container from '@mui/material/Container';
import './App.css';
import Posts from './components/Posts'
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Container>
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" exact Component={Posts} ></Route>
        <Route path="/post/:id" Component={Post}></Route>
        </Routes>
      </Router>
    </div>
    </Container>

  );
}

export default App;
