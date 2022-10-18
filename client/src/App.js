import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import VerifyAccount from "./Components/VerifyAccount"
import ChatOpen from "./Components/ChatOpen"
import "./App.scss"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Login />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
                <Route path="/verify-account/:token" element={<VerifyAccount />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard/group/:groupID" element={<ChatOpen />} />
                    <Route path="/dashboard/conversation/:friendID" element={<ChatOpen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

