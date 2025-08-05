import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useParams, Link } from 'react-router-dom';

const ExpenseDetails = () => {
  useEffect(() => {
    document.title = 'Expense Details';
  }, []);

  const [expense, setExpense] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expenses/${id}/`);
        setExpense(res.data);
      } catch (err) {
        console.error('Error fetching expense:', err);
      }
    };

    fetchExpense();
  }, [id]);

  return expense ? (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Expense Details
      </h1>

      <div className="space-y-4 text-gray-800 text-base">
        <p><span className="font-semibold">Title:</span> {expense.title || '—'}</p>
        <p><span className="font-semibold">User:</span> {expense.user || '—'}</p>
        <p><span className="font-semibold">Amount:</span> ₹{expense.amount}</p>
        <p><span className="font-semibold">Date:</span> {expense.date || '—'}</p>
        <p><span className="font-semibold">Category:</span> {expense.category || '—'}</p>
        <p><span className="font-semibold">Description:</span> {expense.description || '—'}</p>
        <p><span className="font-semibold">Recurring:</span> {expense.is_recurring ? 'Yes' : 'No'}</p>
        {expense.is_recurring && (
          <p><span className="font-semibold">Recurring Interval:</span> {expense.recurring_interval || '—'}</p>
        )}
        <p><span className="font-semibold">Notes:</span> {expense.notes || '—'}</p>
        <p><span className="font-semibold">Created At:</span> {new Date(expense.created_at).toLocaleString()}</p>
        <p><span className="font-semibold">Updated At:</span> {new Date(expense.updated_at).toLocaleString()}</p>

        {/* Receipt preview */}
        {expense.receipt ? (
          <div>
            <span className="font-semibold">Receipt:</span>
            <img
              src={expense.receipt}
              alt="Receipt"
              className="mt-2 w-full max-w-xs rounded shadow"
            />
          </div>
        ) : (
          <p><span className="font-semibold">Receipt:</span> —</p>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/expense-list"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Expense List
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-500">Loading...</p>
    </div>
  );
};

export default ExpenseDetails;
