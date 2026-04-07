"use client";

import React, { useState, useEffect } from 'react';
import styles from './CalendarGrid.module.css';

function getDaysInMonth(year: number, month: number) {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const remainingCells = 42 - days.length; 
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
}

interface CalendarGridProps {
  currentDate: Date;
  selectedStart: string | null;
  selectedEnd: string | null;
  onSelectStart: (date: string | null) => void;
  onSelectEnd: (date: string | null) => void;
}

export default function CalendarGrid({
  currentDate,
  selectedStart,
  selectedEnd,
  onSelectStart,
  onSelectEnd
}: CalendarGridProps) {
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    setDays(getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  const handleDateClick = (dateObj: Date) => {
    const dateStr = dateObj.toISOString().split('T')[0];
    
    if (!selectedStart || (selectedStart && selectedEnd)) {
      onSelectStart(dateStr);
      onSelectEnd(null);
      return;
    }

    if (selectedStart && !selectedEnd) {
      if (dateStr < selectedStart) {
        onSelectStart(dateStr);
      } else {
        onSelectEnd(dateStr);
      }
    }
  };

  const isWeekend = (dateObj: Date) => {
    const day = dateObj.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className={styles.calendarGridSection}>
      <div className={styles.daysHeader}>
        <div className={styles.dayName}>MON</div>
        <div className={styles.dayName}>TUE</div>
        <div className={styles.dayName}>WED</div>
        <div className={styles.dayName}>THU</div>
        <div className={styles.dayName}>FRI</div>
        <div className={`${styles.dayName} ${styles.weekendText}`}>SAT</div>
        <div className={`${styles.dayName} ${styles.weekendText}`}>SUN</div>
      </div>

      <div className={styles.daysGrid}>
        {days.map((dayObj, index) => {
          const dateStr = dayObj.date.toISOString().split('T')[0];
          const isStart = dateStr === selectedStart;
          const isEnd = dateStr === selectedEnd;
          const isBetween = selectedStart && selectedEnd && dateStr > selectedStart && dateStr < selectedEnd;
          
          let cellClass = styles.dateCell;
          if (!dayObj.isCurrentMonth) cellClass += ` ${styles.otherMonth}`;
          else if (isWeekend(dayObj.date)) cellClass += ` ${styles.weekendCell}`;

          if (isStart) cellClass += ` ${styles.selectedStart}`;
          if (isEnd) cellClass += ` ${styles.selectedEnd}`;
          if (isBetween) cellClass += ` ${styles.selectedInBetween}`;

          let containerClass = styles.dateCellContainer;
          if (isBetween) containerClass += ` ${styles.inBetween}`;
          if (isStart && selectedEnd) containerClass += ` ${styles.startNode}`;
          if (isEnd && selectedStart) containerClass += ` ${styles.endNode}`;

          return (
            <div key={index} className={containerClass}>
              <div 
                className={cellClass} 
                onClick={() => handleDateClick(dayObj.date)}
              >
                {dayObj.date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
