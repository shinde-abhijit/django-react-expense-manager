import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListView = ({ expenses }) => {
  return (
    <div className="space-y-4">
      {expenses.map(expense => (
        <div key={expense.id} className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{expense.title}</h3>
            <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
            <p className="text-blue-700 font-bold text-md mt-1">₹ {expense.amount}</p>
            <p className="text-sm text-gray-600">Category: {expense.category}</p>
            {expense.is_recurring && (
              <p className="text-sm text-green-600 font-medium">
                Recurs: {expense.recurring_interval}
              </p>
            )}
            {expense.receipt ? (
              <a href={expense.receipt} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                View Receipt
              </a>
            ) : (
              <p className="text-sm text-gray-400 italic">No receipt</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 text-right">
            <Link to={`/expense-details/${expense.id}`} className="text-blue-600 hover:underline">View</Link>
            <Link to={`/expense-update/${expense.id}`} className="text-green-600 hover:underline">Edit</Link>
            <Link to={`/expense-delete/${expense.id}`} className="text-red-600 hover:underline">Delete</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListView;
