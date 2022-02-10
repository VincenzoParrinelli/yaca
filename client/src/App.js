import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import NewPassword from "./Components/NewPassword"


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/new_password/:id" element={<NewPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}