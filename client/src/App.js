import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import NewLogin from "./Components/NewLogin"
import Dashboard from "./Components/Dashboard"
import ActivateAccount from "./Components/ActivateAccount"
import "./App.scss"


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewLogin />} />
                <Route path="/old_login" element={<Login />} />
                <Route path="/activate_account/:id" element={<ActivateAccount />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}