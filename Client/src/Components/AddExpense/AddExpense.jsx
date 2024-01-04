import { useFormik } from "formik";
import Sidebar from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddExpense = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      date: null,
    },

    onSubmit: async (values) => {
      try {
        console.log(values);

        const { data } = await axios.post("/addExpense", { ...values });

        if (data.status) {
            toast.success(data.message, {
                position: "top-center",
              });
          navigate("/addExpense");
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
      <Sidebar />

      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className=" px-16">
            <h2 className="font-bold text-center text-3xl text-[#002D74]">
              Add Expense
            </h2>

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                onChange={formik.handleChange}
                type="number"
                name="amount"
                placeholder="Amount"
                id="amount"
              />
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="Food">Food </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Rent">Rent</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <Datepicker
                className="p-2 rounded-xl border"
                placeholderText="Pick Date"
                selected={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date)}
              />
              <button
                className="bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
