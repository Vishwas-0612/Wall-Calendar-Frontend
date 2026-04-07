"use client";

import { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import NotesArea from './NotesArea';
import styles from './WallCalendar.module.css';

export default function WallCalendar() {
  const [currentDate] = useState(new Date(2022, 0, 1));
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);

  const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = currentDate.getFullYear();

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.hanger}>
        <div className={styles.nail}></div>
        <div className={styles.wire}></div>
      </div>
      <div className={styles.calendarContainer}>
        <div className={styles.spiralBinder}></div>
      
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h2>{year}</h2>
          <h1>{monthName}</h1>
        </div>
      </div>

      <div className={styles.lowerSection}>
        <NotesArea monthKey={`${year}-${monthName}`} />
        <CalendarGrid 
          currentDate={currentDate}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          onSelectStart={setSelectedStart}
          onSelectEnd={setSelectedEnd}
        />
      </div>
    </div>
    </div>
  );
}
