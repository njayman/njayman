export const getMyWorkingExperience = () => {
  const oneYear = 31536000000;
  const startingDate = new Date(2020, 11);
  const currentDate = new Date();
  const difference = currentDate.getTime() - startingDate.getTime();

  return Math.floor(difference / oneYear);
};
