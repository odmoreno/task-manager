import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
//import Chart from './pages/Chart'

const Router = () => {
    //const token = useAuthStore((state) => state.token)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/chart" element={<Chart />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router