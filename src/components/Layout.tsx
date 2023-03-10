import React, { useEffect, useState } from 'react';

export const FullWidth = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className="relative full-vwh full-vh background-primary">{children}</div>;
};

export const FlexGrid = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [invisibleItems, setInvisibleItems] = useState<number>(0);
  const [height, setHeight] = useState<string>();
  const [width, setWidth] = useState<string>();

  useEffect(() => {
    const grid = document.getElementById('grid');
    const children = [].slice.call(grid?.children) as HTMLElement[];
    if (children.length > 0) {
      const baseOffset = children[0].offsetTop;
      const breakIndex = children.findIndex((item) => item.offsetTop > baseOffset);
      const gridWidth = grid?.clientWidth || 0;
      const maxPerRow = Math.floor(gridWidth / children[0].clientWidth);
      const numPerRow = breakIndex === -1 ? maxPerRow : breakIndex;

      children[0].classList.forEach((item) => {
        if (item.includes('height')) {
          setHeight(item);
        }

        if (item.includes('width')) {
          setWidth(item);
        }
      });

      setInvisibleItems(children.length % numPerRow > 0 ? numPerRow - (children.length % numPerRow) : 0);
    }
  }, []);

  return (
    <div className="full-width margin-horizontal-auto">
      <div id="grid" className="flex-row flex-wrap flex-gap justify-center">
        {children}
        {invisibleItems > 0 &&
          [...Array(invisibleItems)].map((item) => <div key={item} className={`${height} ${width}`} />)}
      </div>
    </div>
  );
};
