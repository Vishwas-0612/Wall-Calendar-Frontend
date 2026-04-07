"use client";
import React, { useState, useEffect } from 'react';
import styles from './NotesArea.module.css';

interface NotesAreaProps {
  monthKey: string;
}

export default function NotesArea({ monthKey }: NotesAreaProps) {
  const [notes, setNotes] = useState<string[]>(Array(7).fill(''));
  const storageKey = `calendar-notes-${monthKey}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Error parsing stored notes", e);
      }
    }
  }, [storageKey]);

  const handleNoteChange = (index: number, value: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);

    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
  };

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesTitle}>Notes</div>
      <div className={styles.notesList}>
        {notes.map((note, idx) => (
          <input 
            key={idx}
            type="text"
            className={styles.noteLine}
            value={note}
            onChange={(e) => handleNoteChange(idx, e.target.value)}
            placeholder=" "
            maxLength={50}
          />
        ))}
      </div>
    </div>
  );
}
