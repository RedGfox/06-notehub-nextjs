'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
