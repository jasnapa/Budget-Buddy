import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import expense from "./assets/expense.jpg"




const Login = () => {

    const navigate = useNavigate()
    const validate = Yup.object({
        email: Yup.string()
          .email("invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      });
    
        const formik = useFormik({
          initialValues: {
            email: "",
            password: "",
          },
    
        validationSchema: validate,
    
        onSubmit: async (values) => {
          try {
            console.log(values);
            const { data } = await axios.post("/login", { ...values });
            console.log(data);
            
    
            if (data.status) {
              navigate("/dashboard");
            
            } else if (data.error) {
              toast.error(data.message, {
                position: "top-center",
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
   
        return (
            <>
              <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                  <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
                    <p className="text-sm mt-4 text-[#002D74]">Welcome Back!</p>
        
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <input
                        className="p-2 mt-8 rounded-xl border"
                        onChange={formik.handleChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                        id=""
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                      ) : null}
                      <div className="relative">
                        <input
                          className="p-2  rounded-xl border w-full"
                          onChange={formik.handleChange}
                          type= "password"
                          name="password"
                          placeholder="Password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                      </div>
                      <button
                        className="bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                    <div className="mt-10 grid-cols-3 items-center text-gray-500">
                      <hr className=" text-gray-500" />
                      <p className="text-center text-sm">OR</p>
                      <hr className=" text-gray-500" />
                    </div>
        
                    {/* <p className='mt-5 text-xs border-b py-4'>Forget your password</p> */}
        
                    <div className="mt-3 text-xs flex justify-between items-center">
                      <p>Not a member yet !?</p>
                      <a
                        href="/signup"
                        className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                  <div className="w-1/2 md:block hidden">
            <img className=" rounded-2xl" src={expense} alt="" />
          </div>
                
                </div>
              </section>
            </>
          );
      
}

export default Login