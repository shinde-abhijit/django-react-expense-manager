import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExpense = () => {
  useEffect(() => {
    document.title = 'Update Expense';
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    date: '',
    title: '',
    amount: '',
    category: 'OTHER',
    description: '',
    is_recurring: false,
    recurring_interval: '',
    notes: '',
  });

  const [receiptFile, setReceiptFile] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expenses/${id}/`);
        const data = res.data;

        setFormData({
          date: data.date || '',
          title: data.title || '',
          amount: data.amount || '',
          category: data.category || 'OTHER',
          description: data.description || '',
          is_recurring: data.is_recurring || false,
          recurring_interval: data.recurring_interval || '',
          notes: data.notes || '',
        });
      } catch (err) {
        console.error('Failed to load expense:', err);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === 'is_recurring' && !checked ? { recurring_interval: '' } : {}),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (receiptFile) {
      data.append('receipt', receiptFile);
    }

    try {
      await api.put(`/expenses/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/expense-list');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const categoryOptions = ['FOOD', 'TRAVEL', 'BILLS', 'ENTERTAINMENT', 'HEALTH', 'OTHER'];
  const recurringOptions = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Expense</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

        <div>
          <label htmlFor="date" className="block mb-1 font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1 font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_recurring"
            name="is_recurring"
            checked={formData.is_recurring}
            onChange={handleChange}
          />
          <label htmlFor="is_recurring" className="text-gray-700 font-medium">Is Recurring?</label>
        </div>

        {formData.is_recurring && (
          <div>
            <label htmlFor="recurring_interval" className="block mb-1 font-medium text-gray-700">Recurring Interval</label>
            <select
              id="recurring_interval"
              name="recurring_interval"
              value={formData.recurring_interval}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select Interval</option>
              {recurringOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="receipt" className="block mb-1 font-medium text-gray-700">Receipt (jpg, png, pdf - max 5MB)</label>
          <input
            type="file"
            id="receipt"
            name="receipt"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block mb-1 font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExpense;
