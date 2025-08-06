import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseGridView = ({ expenses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {expenses.map(expense => (
        <div key={expense.id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
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
            <a href={expense.receipt} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mb-2">
              View Receipt
            </a>
          ) : (
            <p className="text-sm text-gray-400 italic mb-2">No receipt</p>
          )}

          <div className="flex justify-between mt-3">
            <Link to={`/expense-details/${expense.id}`} className="text-blue-600 hover:underline">View</Link>
            <Link to={`/expense-update/${expense.id}`} className="text-green-600 hover:underline">Edit</Link>
            <Link to={`/expense-delete/${expense.id}`} className="text-red-600 hover:underline">Delete</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseGridView;
