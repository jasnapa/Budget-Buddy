
import {Route, Routes} from "react-router-dom"
import SignUp from "../Components/SignUp/SignUp"
import Login from "../Components/Login/Login"
import AddExpense from "../Components/AddExpense/AddExpense"
import Dashboard from "../Components/Dashboard/Dashboard"
import AllExpense from "../Components/AllExpense/AllExpense"


const userRouter = ()=>{
    return(
        <Routes>

    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/addExpense" element={<AddExpense/>}/>
    <Route path="/allExpense" element={<AllExpense/>}/>

        </Routes>
    )

}
export default userRouter