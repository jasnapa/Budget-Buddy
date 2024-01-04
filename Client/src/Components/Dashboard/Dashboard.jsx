import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import AllExpense from "../AllExpense/AllExpense";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [expenses, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [editMode, setEditmode] = useState(false);
  const [budget, setBudget] = useState(null);
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/getExpense");
        if (data.status) {
          setExpense(data.expenses)
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const total = filteredExpenses.reduce((acc, expense) => {
      return acc + parseInt(expense.amount, 10);
    }, 0);

    setTotalAmount(total);
    console.log(totalAmount);
  }, [expenses]);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/addBudget", { budget });

      if (data.status) {
        toast.success(data.message, {
          position: "top-center",
        })
        setRefresh(!refresh)
        setEditmode(!editMode)
        navigate("/dashboard");
      } else if (data.error) {
        toast.error(data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="grid grid-cols-2 ml-40 mt-16  md:flex justify-center gap-4">
        <div
          href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            This month Expense
          </h5>
          <p class="font-extrabold text-center text-red-700">{totalAmount}</p>
        </div>
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            This month Budget
          </h5>
          {editMode ? (
            <input
              type="number"
              className=" rounded-xl border"
              onChange={(e) => setBudget(e.target.value)}
            />
          ) : (
            <p class="font-extrabold text-center text-green-700">{expenses[0]?.user.monthlyBudget}</p>
          )}
          <div>
            {editMode ? (
              <button onClick={handleSubmit} className="text-blue-500 mt-1">
                Update
              </button>
            ) : (
              <button
                onClick={() => setEditmode(!editMode)}
                className="text-blue-500 mt-1"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <AllExpense />
    </>
  );
};

export default Dashboard;
