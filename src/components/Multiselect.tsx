import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
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
  setOptions,
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
  setOptions?: Dispatch<SetStateAction<T[]>>;
  width?: number;
  inline?: boolean;
  placeholder?: string;
  creation?: boolean;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: wrapperRef,
    onClick: () => {
      setActive(false);
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
      return (
        <div className="height-32 flex-row align-center padding-left-8">
          {selectedItems.map((option) => (
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
          ))}
        </div>
      );
    }

    return null;
  }, [selectedItems, setSelectedItems, setActive, active, creation]);

  const renderOptions = useCallback(() => {
    return (
      filteredOptions.length > 0 &&
      filteredOptions.map((option) => (
        <div
          key={option as string}
          className={`padding-8 margin-2 ${
            selectedItems.includes(option) ? 'background-primary white' : 'hover-background-neutral'
          }`}
          onClick={() => {
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
  }, [filteredOptions, selectedItems, setSelectedItems]);

  const handleSaveCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (setOptions && searchValue.length > 0 && !options.includes(searchValue.toLowerCase() as T)) {
      setOptions([...options, searchValue as T]);
    }

    const newItems = [...selectedItems, searchValue.toLowerCase() as T];
    setSelectedItems(newItems);
    setSearchValue('');
    setFilteredOptions(options);
  };

  const renderNoItems = useCallback(() => {
    if (filteredOptions.length === 0) {
      if (creation) {
        return (
          <div className="flex-row align-center padding-8 font-16 flex-1">
            There are no options with your search. Press enter or click to save new option.
          </div>
        );
      }

      return (
        <div className="flex-row align-center padding-8 font-16 flex-1">
          There are no options with your search. Please try a new search term.
        </div>
      );
    }
    return null;
  }, [creation, filteredOptions]);

  const renderSearch = useCallback(() => {
    if (active) {
      return (
        <form
          className="flex-1 flex-row align-center padding-right-40 padding-left-8"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            filteredOptions.length === 0 && handleSaveCreation(event)
          }
        >
          <input
            autoFocus
            className="border-none focus-none font-16 flex-1 min-width-0"
            type="text"
            value={searchValue}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setSearchValue(event.currentTarget.value)}
          />
          <Button variation="inline" text={filteredOptions.length > 0 ? 'Search' : 'Save'} type="submit" width={80} />
        </form>
      );
    }

    return (
      <div className="flex-1 flex-row align-center padding-left-8 height-32" onClick={() => setActive(!active)}>
        {placeholder}
      </div>
    );
  }, [active, searchValue, setSearchValue, setActive, filteredOptions]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) => {
        const optionAsString = option as string;
        if (optionAsString.includes(searchValue)) {
          return option;
        }
      })
    );
  }, [searchValue, options]);

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
            }}
          />
          <div className="absolute full-width left-0 bottom-0 min-height-32 flex-row flex-wrap align-center">
            {renderItems()}
            {renderSearch()}
          </div>
          {renderEndItem()}
        </div>
        {active && (
          <div
            className={`absolute right-0 background-white border-neutral flex-column pointer max-height-200  ${
              width ? `width-${width}` : 'full-width'
            }`}
            style={{ top: inline ? 30 : 53, zIndex: 1 }}
          >
            {renderNoItems()}
            {renderOptions()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiselect;
