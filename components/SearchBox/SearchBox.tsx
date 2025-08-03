import css from './SearchBox.module.css';
import { ChangeEvent } from 'react';

interface SearchBoxProps {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      onChange={onChange}
      type="text"
      placeholder="Search notes"
    />
  );
}
