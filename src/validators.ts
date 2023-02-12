export const isValidSquareMatrix = (flatArrayLength: number): boolean => {
  const squareMatrixSize = Math.sqrt(flatArrayLength);

  return Number.isInteger(squareMatrixSize);
};

export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);

    return true;
  } catch (error) {
    return false;
  }
};
