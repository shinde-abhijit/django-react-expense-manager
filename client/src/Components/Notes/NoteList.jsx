import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const NoteList = () => {
  useEffect(() => {
    document.title = 'Note List';
  }, []);

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes/');
        setNotes(res.data);
      } catch (err) {
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const noteId = draggableId;
    const note = notes.find((n) => n.id.toString() === noteId);
    if (!note) return;

    const newStatus = destination.droppableId;
    if (note.status !== newStatus) {
      try {
        const updatedNote = { ...note, status: newStatus };
        await api.put(`/notes/${note.slug}/`, updatedNote);
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
        );
      } catch (error) {
        console.error('Failed to update note status:', error);
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

  const drafts = notes.filter((note) => note.status === 'draft');
  const published = notes.filter((note) => note.status === 'published');

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Notes</h2>
        <Link
          to="/add-note"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add New Note
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Drafts */}
          <Droppable droppableId="draft">
            {(provided) => (
              <div
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 shadow-sm"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  📝 Drafts
                </h3>
                {drafts.map((note, index) => (
                  <Draggable
                    key={note.id}
                    draggableId={note.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg mb-4 shadow transition"
                      >
                        <Link to={`/note-details/${note.slug}`}>
                          <h4 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                            {note.title.length > 50
                              ? note.title.slice(0, 50) + '...'
                              : note.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          Status: <span className="capitalize">{note.status}</span>
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <Link
                            to={`/note-update/${note.slug}`}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <span className="text-gray-400">
                            {new Date(note.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Published */}
          <Droppable droppableId="published">
            {(provided) => (
              <div
                className="bg-white border-2 border-dashed border-green-300 rounded-xl p-6 shadow-sm"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  ✅ Published
                </h3>
                {published.map((note, index) => (
                  <Draggable
                    key={note.id}
                    draggableId={note.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-green-50 hover:bg-green-100 p-4 rounded-lg mb-4 shadow transition"
                      >
                        <Link to={`/note-details/${note.slug}`}>
                          <h4 className="text-lg font-semibold text-gray-900 hover:text-green-700">
                            {note.title.length > 50
                              ? note.title.slice(0, 50) + '...'
                              : note.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          Status: <span className="capitalize">{note.status}</span>
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <Link
                            to={`/note-update/${note.slug}`}
                            className="text-green-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <span className="text-gray-400">
                            {new Date(note.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default NoteList;
