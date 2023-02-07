import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { MdArrowDropDown, MdClose, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { format, isToday } from 'date-fns';

import useClickOutside from 'hooks/useClickOutside.hook';

import 'react-datepicker/dist/react-datepicker.css';

const WrappedDatePicker = ({
  open,
  setOpen,
  width,
  selectedDate,
  setSelectedDate,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width?: number;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  return (
    <ReactDatePicker
      open={open}
      wrapperClassName={`${width ? `width-${width}` : 'full-width'}`}
      calendarClassName="background-white border-none"
      dayClassName={(date: Date) => `font-16 border-radius-none
${isToday(date) && 'background-neutral-important'}
${
  date.toDateString() === selectedDate?.toDateString()
    ? 'background-primary hover-background-primary'
    : ' background-white hover-background-neutral'
}`}
      weekDayClassName={() => 'font-16 background-white'}
      monthClassName={() => 'font-16 background-white'}
      selected={selectedDate}
      onChange={(date: Date) => {
        setSelectedDate(date || undefined);
        setOpen(false);
      }}
      inline={true}
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="flex-row justify-space-between align-center padding-left-10 background-white">
          <div className="font-20">{format(monthDate, 'MMMM yyyy')}</div>
          <div className="flex-row align-center">
            <div className="height-32 width-32 center-items pointer" onClick={() => decreaseMonth()}>
              <MdKeyboardArrowLeft size={20} />
            </div>
            <div className="height-32 width-32 center-items pointer" onClick={() => increaseMonth()}>
              <MdKeyboardArrowRight size={20} />
            </div>
          </div>
        </div>
      )}
    />
  );
};

const DatePicker = ({
  id,
  label,
  selectedDate,
  setSelectedDate,
  inline,
  width,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  inline?: boolean;
  width?: number;
  required?: boolean;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: wrapperRef, onClick: () => setOpen(false) });

  const renderClearItem = () => {
    if (selectedDate && !required) {
      return (
        <div
          className="absolute hover-primary height-20 pointer"
          style={{ right: 30, bottom: 6 }}
          onClick={() => {
            setSelectedDate(undefined);
          }}
        >
          <MdClose size={20} />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id={id}
      className={`relative margin-vertical-8 ${inline ? 'flex-row align-center' : 'flex-column align-stretch'}`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      <div ref={wrapperRef}>
        <div
          className={`height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer ${
            width ? `width-${width}` : 'full-width'
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex-1 flex-row align-center justify-space-between">
            {selectedDate ? format(selectedDate, 'd MMMM yyyy') : <span className="neutral-dark">{placeholder}</span>}
          </div>
          <div className="height-20 pointer">
            <MdArrowDropDown size={20} />
          </div>
        </div>
        {renderClearItem()}
        {open && (
          <div
            className="absolute right-0 border-neutral background-white"
            style={{ top: inline ? 30 : 53, zIndex: 1 }}
          >
            <WrappedDatePicker
              open={open}
              setOpen={setOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              width={width}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
