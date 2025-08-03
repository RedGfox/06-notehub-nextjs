import css from './NoteList.module.css';

import toast from 'react-hot-toast';
import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`Note "${data.title}" deleted.`);
    },
    onError: () => {
      toast.error(`Failed to delete note.`);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.delete}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
