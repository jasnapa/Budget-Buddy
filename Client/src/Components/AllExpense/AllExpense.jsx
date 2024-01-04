import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllExpense = () => {
  const [expense, setExpense] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/getExpense");
        console.log(data);
        if (data.status) {
          setExpense(data.expenses);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post(`/deleteExpense/${id}`);

      if (data.status) {
        toast.success(data.message, {
          position: "top-center",
        });
        setRefresh(true)
      } else {
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

      <ul className="bg-white shadow-xl overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        <h1 className="text-center font-bold text-lg m-3">All Expenses</h1>
        {expense?.map((item) => (
          <li key={item.id} className="border-t  border-gray-200">
            <div className="px-4 shadow-xl py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {item.amount} Rs
                </h3>
                <p className="mt-1 max-w-2xl text-md font-semibold text-green-500">
                  {item.category}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500"></p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllExpense
