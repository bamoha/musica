import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Nav from './components/Navbar';
import HomePage from './pages/HomePage';
import Artist from './pages/Artist';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <ChakraProvider>
            <CSSReset />
            <Nav />
            <Router>
                <div>
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/artist/:artistId" element={<Artist />} />
                    </Routes>
                </div>
            </Router>
        </ChakraProvider>
    );
}

export default App;
