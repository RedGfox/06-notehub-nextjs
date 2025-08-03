'use client';

import css from './NotePage.module.css';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';

import { Note } from '@/types/note';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { ErrorMessageEmpty } from '@/components/ErrorMessageEmpty/ErrorMessageEmpty';
import NoteList from '@/components/NoteList/NoteList';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import { fetchNotes } from '@/lib/api';
import { SearchBox } from '@/components/SearchBox/SearchBox';

interface NotesClientProps {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  initialQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialData,
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
    initialData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setCurrentPage(1);
    },
    1000
  );
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}
        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-right" />
      {isSuccess && data?.notes.length === 0 && <ErrorMessageEmpty />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
