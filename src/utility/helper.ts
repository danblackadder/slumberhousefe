export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getFullName = ({
  firstName,
  lastName,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
}) => {
  if (firstName && lastName) return `${capitalize(firstName)} ${capitalize(lastName)}`;
  if (firstName && !lastName) return capitalize(firstName);
  if (lastName && !firstName) return capitalize(lastName);
  return '-';
};

export const getGroupName = ({ name }: { name: string | undefined }) => {
  if (name) return capitalize(name);
  return '-';
};
