import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const TodoList = () => {
  useEffect(() => {
    document.title = 'Todo List';
  }, []);

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Number of todos per page

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos/');
        setTodos(res.data);
      } catch (err) {
        setError('Failed to load Todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const todoId = draggableId;
    const todo = todos.find((n) => n.id.toString() === todoId);
    if (!todo) return;

    const newStatus = destination.droppableId;
    if (todo.status !== newStatus) {
      try {
        const updatedTodo = { ...todo, status: newStatus };
        await api.put(`/todos/${todo.slug}/`, updatedTodo);
        setTodos((prevTodos) =>
          prevTodos.map((n) => (n.id === todo.id ? updatedTodo : n))
        );
      } catch (error) {
        console.error('Failed to update todo status:', error);
      }
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );

  // Filter todos by status
  const pendings = todos.filter((todo) => todo.status === 'pending');
  const completed = todos.filter((todo) => todo.status === 'completed');

  // Calculate pagination slices
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const paginatedPendings = paginate(pendings);
  const paginatedCompleted = paginate(completed);

  // Total pages for each category
  const totalPagesPendings = Math.ceil(pendings.length / pageSize);
  const totalPagesCompleted = Math.ceil(completed.length / pageSize);

  // Helper to render pagination controls for a category
  const PaginationControls = ({ totalPages, onPageChange, currentPage }) => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return <div className="mt-4">{pages}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Todos</h2>
        <Link
          to="/add-todo"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add New Todo
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pendings */}
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 shadow-sm"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  📝 Pendings
                </h3>
                {paginatedPendings.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg mb-4 shadow transition"
                      >
                        <Link to={`/todo-details/${todo.slug}`}>
                          <h4 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                            {todo.title.length > 50
                              ? todo.title.slice(0, 50) + '...'
                              : todo.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          Status: <span className="capitalize">{todo.status}</span>
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <Link
                            to={`/todo-update/${todo.slug}`}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <span className="text-gray-400">
                            {new Date(todo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <PaginationControls
                  totalPages={totalPagesPendings}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Droppable>

          {/* Completed */}
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="bg-white border-2 border-dashed border-green-300 rounded-xl p-6 shadow-sm"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  ✅ Completed
                </h3>
                {paginatedCompleted.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-green-50 hover:bg-green-100 p-4 rounded-lg mb-4 shadow transition"
                      >
                        <Link to={`/todo-details/${todo.slug}`}>
                          <h4 className="text-lg font-semibold text-gray-900 hover:text-green-700">
                            {todo.title.length > 50
                              ? todo.title.slice(0, 50) + '...'
                              : todo.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          Status: <span className="capitalize">{todo.status}</span>
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <Link
                            to={`/todo-update/${todo.slug}`}
                            className="text-green-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <span className="text-gray-400">
                            {new Date(todo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <PaginationControls
                  totalPages={totalPagesCompleted}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
