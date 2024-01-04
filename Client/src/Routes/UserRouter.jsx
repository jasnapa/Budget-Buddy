
import {Route, Routes} from "react-router-dom"
import SignUp from "../Components/SignUp/SignUp"
import Login from "../Components/Login/Login"
import Home from "../Components/Home/Home"


const userRouter = ()=>{
    return(
        <Routes>

    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>

        </Routes>
    )

}
export default userRouter