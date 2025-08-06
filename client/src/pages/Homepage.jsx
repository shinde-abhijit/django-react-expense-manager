import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import HomepageSkeleton from './Skeleton/HomepageSkeleton';

const Homepage = () => {
  const [data, setData] = useState({
    notes: [],
    contacts: [],
    expenses: [],
    todos: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesRes, contactsRes, expensesRes, todosRes] = await Promise.all([
          api.get('/notes/?limit=5'),
          api.get('/contacts/?limit=5'),
          api.get('/expenses/?limit=5'),
          api.get('/todos/?limit=5'),
        ]);

        setData({
          notes: notesRes.data,
          contacts: contactsRes.data,
          expenses: expensesRes.data,
          todos: todosRes.data,
        });
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <HomepageSkeleton />;

  return (
    <div className="max-w-4xl p-8 mx-auto space-y-10">
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className="text-xl font-bold text-gray-800 mb-2">📝 Latest Notes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>

      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className="text-xl font-bold text-gray-800 mb-2">👤 Latest Contacts</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.contacts.map((contact) => (
            <li key={contact.id}>{contact.first_name}</li>
          ))}
        </ul>
      </div>

      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className="text-xl font-bold text-gray-800 mb-2">💸 Latest Expenses</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.expenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} - <span className="text-green-600 font-medium">₹{expense.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className="text-xl font-bold text-gray-800 mb-2">✅ Latest Todos</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
