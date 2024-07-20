
import '@/App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PageIssue from "./pages/PageIssue.tsx";
import { PageDesigners } from './pages/PageDesigners.tsx';
// import {Line, LineChart, XAxis, YAxis} from "recharts";

function App() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/issues" element={<PageIssue/>}/>
            <Route path="/designers" element={<PageDesigners/>}/>
        </Routes>
    </BrowserRouter>
}

export default App
