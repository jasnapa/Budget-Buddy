import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/getExpense");
        if (data.status) {
          setExpense(data.expenses);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

    setTotalAmount(total)
    console.log(totalAmount);
  }, [expenses]);

  return(
  <Sidebar />
  )
};

export default Dashboard;
