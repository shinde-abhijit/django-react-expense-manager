import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteExpense = () => {
  useEffect(() => {
    document.title = 'Delete Expense';
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/expenses/${id}/`);
      navigate('/expense-list');
    } catch (error) {
      console.error('Failed to delete expense:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/expense-list');
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow-md text-center">
      {!confirmed && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Are you sure you want to delete this expense?
          </h2>
          <p className="text-gray-600 mb-6">This action cannot be undone.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setConfirmed(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {confirmed && !loading && (
        <>
          <p className="text-gray-700 mb-4">Deleting expense...</p>
          {handleConfirmDelete()}
        </>
      )}
      {loading && <p className="text-gray-500">Please wait...</p>}
    </div>
  );
};

export default DeleteExpense;
