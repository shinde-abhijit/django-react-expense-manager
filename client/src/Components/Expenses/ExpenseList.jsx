import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import ExpenseGridView from './Views/ExpenseGridView';
import ExpenseListView from './Views/ExpenseListView';

import ExpenseGridViewSkeleton from './ExpenseSkeletons/ExpenseGridViewSkeleton';
import ExpenseListViewSkeleton from './ExpenseSkeletons/ExpenseListViewSkeleton';

const PAGE_SIZE = 50;

const ExpenseList = () => {
  useEffect(() => {
    document.title = "Expense List";
  }, []);

  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('expense_view_mode') || 'grid');

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

  const handleViewToggle = (mode) => {
    setViewMode(mode);
    localStorage.setItem('expense_view_mode', mode);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Expense List</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleViewToggle('list')}
            className={`px-3 py-1 border rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'border-gray-400'}`}
          >
            List View
          </button>
          <button
            onClick={() => handleViewToggle('grid')}
            className={`px-3 py-1 border rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'border-gray-400'}`}
          >
            Grid View
          </button>
          <Link
            to="/add-expense"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Expense
          </Link>
        </div>
      </div>

      {loading ? (
        viewMode === 'grid' ? (
          <ExpenseGridViewSkeleton />
        ) : (
          <ExpenseListViewSkeleton />
        )
      ) : expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <ExpenseGridView expenses={expenses} />
          ) : (
            <ExpenseListView expenses={expenses} />
          )}

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
