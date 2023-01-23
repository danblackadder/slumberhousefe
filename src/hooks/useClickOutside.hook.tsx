import { useEffect, useState } from 'react';

const useClickOutside = ({ ref, onClick }: { ref: React.RefObject<HTMLDivElement>; onClick: () => void }) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        onClick();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
