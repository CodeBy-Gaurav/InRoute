import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Maps from './Components/Map';
import Chatbot from './Components/Chatbot';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element= {<Main/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
        </Router>
    );
}

export default App;
