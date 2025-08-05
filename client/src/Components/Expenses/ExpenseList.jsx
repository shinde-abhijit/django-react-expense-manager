import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import ExpenseListSkeleton from './ExpenseListSkeleton'; // optional skeleton loader

const PAGE_SIZE = 50;

const ExpenseList = () => {
  useEffect(() => {
    document.title = "Expense List";
  }, []);

  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const response = await api.get('/expenses/', {
          params: { page, page_size: PAGE_SIZE },
        });
        setExpenses(response.data.results || response.data);
        setTotalCount(response.data.count || response.data.length);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
      setLoading(false);
    };

    fetchExpenses();
  }, [page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Expense List</h2>
        <Link
          to="/add-expense"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Expense
        </Link>
      </div>

      {loading ? (
        <ExpenseListSkeleton />
      ) : expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {expenses.map(expense => (
              <div
                key={expense.id}
                className="bg-white shadow rounded p-4 flex flex-col justify-between"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{expense.title}</h3>
                  <p className="text-gray-600 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
                </div>

                <p className="text-lg font-bold text-blue-700 mb-2">₹ {expense.amount}</p>
                <p className="text-sm text-gray-700 mb-1">
                  Category: <span className="font-medium">{expense.category}</span>
                </p>

                {expense.is_recurring && (
                  <p className="text-sm text-green-600 font-medium mb-1">
                    Recurs: {expense.recurring_interval}
                  </p>
                )}

                {expense.receipt ? (
                  <a
                    href={expense.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline mb-2"
                  >
                    View Receipt
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 italic mb-2">No receipt</p>
                )}

                <div className="flex justify-between mt-3">
                  <Link to={`/expense-details/${expense.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                  <Link to={`/expense-update/${expense.id}`} className="text-green-600 hover:underline">
                    Edit
                  </Link>
                  <Link to={`/expense-delete/${expense.id}`} className="text-red-600 hover:underline">
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded border ${
                page === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition'
              }`}
            >
              Previous
            </button>
            <span>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded border ${
                page === totalPages
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
