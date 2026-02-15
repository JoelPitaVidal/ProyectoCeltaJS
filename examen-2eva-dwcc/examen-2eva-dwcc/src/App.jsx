import "./App.css";
import Parte1 from "./parte1/parte1.jsx"
import Parte2 from "./parte2/parte2.jsx"
import Layout from "./Layout.jsx";


import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
     return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="parte1" element={<Parte1 />} />
          <Route path="Parte2" element={<Parte2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
