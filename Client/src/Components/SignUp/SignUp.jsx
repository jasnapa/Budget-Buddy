import { Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import picture from "./assets/picture.jpg"

const SignUp = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("First Name Required"),
    email: Yup.string()
      .email("invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "password must be at least 6 charecters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },

    validationSchema: validate,
    onSubmit: async (values) => {
      console.log("onsubmit@#$32", values);
      try {
        const { data } = await axios.post("/signUp", { ...values });
        console.log("respomse", data);
        const email = formik.values.email;

        if (data.status) {
          toast.success(data.message, {
            position: "top-center",
          });
          navigate("/Login");
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
        console.log(error);
      }
    },
  });
 

  return (
    <Formik>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100  flex rounded-2xl shadow-lg max-w-2xl items-center">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-3xl text-[#002D74]">
              Register Here..
            </h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Lets Start Your Journey!
            </p>
            {/* {errorMessage ? <div className="text-red-500 pb-6 text-center ">{errorMessage}</div> : ""} */}

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="name"
                placeholder="Full Name"
                id="name"
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}

              <input
                className="p-2 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}

              <div className="relative">
                <input
                  className="p-2  rounded-xl border w-full"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <input
                className="p-2  rounded-xl border w-full"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmpassword}
                </div>
              ) : null}
              <button
                className="bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-3 text-xs flex justify-between items-center">
              <p>Already a member !?</p>
              <a
                href="/Login"
                className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl"
              >
                Login
              </a>
            </div>
          </div>
          <div className="w-1/2 h-fit md:block hidden">
                        <img className=' rounded-2xl' src={picture} alt="" />
                    </div>
        </div>
      </section>
    </Formik>
  );
};

export default SignUp;
