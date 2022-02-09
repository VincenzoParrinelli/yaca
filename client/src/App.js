import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import SideBar from "./Components/SideBar"
import Nav from "./Components/Nav"
import NewPassword from "./Components/NewPassword"


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/new_password/:id" element={<NewPassword />} />
            </Routes>
        </BrowserRouter>
    )
}