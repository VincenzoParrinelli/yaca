import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import ActivateAccount from "./Components/ActivateAccount"


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/activate_account/:id" element={<ActivateAccount />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}