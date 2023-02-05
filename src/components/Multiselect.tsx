import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { MdArrowDropDown, MdClose } from 'react-icons/md';

import useClickOutside from 'hooks/useClickOutside.hook';
import { capitalize } from 'utility/helper';

import Button from './Button';

const Multiselect = <T,>({
  id,
  label,
  selectedItems,
  setSelectedItems,
  options,
  width,
  inline,
  placeholder = 'Select items...',
  creation,
}: {
  id: string;
  label: string;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  options: T[];
  width?: number;
  inline?: boolean;
  placeholder?: string;
  creation?: boolean;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [creationActive, setCreationActive] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: wrapperRef,
    onClick: () => {
      setActive(false);
      setCreationActive(false);
    },
  });

  const renderEndItem = useCallback(() => {
    if (selectedItems.length > 0) {
      return (
        <div
          className="hover-primary height-20 pointer"
          onClick={() => {
            setSelectedItems([]);
            setActive(false);
          }}
        >
          <MdClose size={20} />
        </div>
      );
    }

    return (
      <div className="height-20 pointer" onClick={() => setActive(true)}>
        <MdArrowDropDown size={20} />
      </div>
    );
  }, [selectedItems]);

  const renderItems = useCallback(() => {
    if (selectedItems.length > 0) {
      return selectedItems.map((option) => (
        <div
          key={option as string}
          className="padding-vertical-2 padding-horizontal-4 background-primary border-radius margin-right-4 flex-row align-center"
          onClick={() => {
            const newItems = selectedItems.filter((item) => item !== option);
            setSelectedItems(newItems);
          }}
        >
          <div className="white font-14">{capitalize(option as string)}</div>
          <div className="margin-left-2 white center-items">
            <MdClose size={14} />
          </div>
        </div>
      ));
    }

    return <div onClick={() => setActive(!active)}>{placeholder}</div>;
  }, [selectedItems, setSelectedItems, setActive, active, creation]);

  const renderOptions = useCallback(() => {
    return (
      options.length > 0 &&
      options.map((option) => (
        <div
          key={option as string}
          className={`padding-8 margin-2 ${
            selectedItems.includes(option) ? 'background-primary white' : 'hover-background-neutral'
          }`}
          onClick={() => {
            if (creationActive) setCreationActive(false);
            if (selectedItems.includes(option)) {
              const newItems = selectedItems.filter((item) => item !== option);
              setSelectedItems(newItems);
            } else {
              const newItems = [...selectedItems, option];
              setSelectedItems(newItems);
            }
          }}
        >
          {capitalize(option as string)}
        </div>
      ))
    );
  }, [options, selectedItems, setSelectedItems, creationActive]);

  const handleSaveNewTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('new tag saved');
  };

  const renderCreation = useCallback(() => {
    if (creation) {
      if (creationActive) {
        return (
          <form
            className="flex-row align-center"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSaveNewTag(event)}
          >
            <input autoFocus className="padding-8 border-none focus-none font-16 flex-1 min-width-0" type="text" />
            <Button variation="inline" text="Save" type="submit" width={80} />
          </form>
        );
      }

      return (
        <div className="padding-8 margin-2 neutral-dark" onClick={() => setCreationActive(true)}>
          Click here to add a new item...
        </div>
      );
    }
    return null;
  }, [creation, creationActive]);

  return (
    <div
      id={id}
      className={`relative margin-vertical-8 black ${inline ? 'flex-row align-center' : 'flex-column'} ${
        width && !inline ? `width-${width}` : 'full-width'
      }`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      <div ref={wrapperRef}>
        <div
          className={`height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer  ${
            width ? `width-${width}` : 'full-width'
          }`}
        >
          <div
            className="flex-1 height-32"
            onClick={() => {
              setActive(!active);
              if (creationActive) setCreationActive(false);
            }}
          />
          <div className="absolute left-0 bottom-0 height-32 flex-row align-center padding-left-8">{renderItems()}</div>
          {renderEndItem()}
        </div>
        {active && (
          <div
            className={`absolute right-0 background-white border-neutral flex-column pointer max-height-200  ${
              width ? `width-${width}` : 'full-width'
            }`}
            style={{ top: inline ? 30 : 53, zIndex: 1 }}
          >
            {renderCreation()}
            {renderOptions()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiselect;
