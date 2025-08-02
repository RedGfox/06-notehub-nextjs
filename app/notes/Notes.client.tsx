'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '@/lib/noteApi';
import { useState } from 'react';
import css from './NotesPage.module.css';
import Link from 'next/link';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes(1, 12, search),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', search] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={css.searchInput}
        />
        {/* Можно добавить кнопку создания заметки, если нужно */}
        {/* <button className={css.button}>Create Note</button> */}
      </div>

      <div className={css.notesList}>
        {data.notes.map(note => (
          <div key={note.id} className={css.noteCard}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.tag}</p>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              type="button"
              onClick={() => handleDelete(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
