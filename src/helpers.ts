import { IsPointOnBorderInterface } from './types';

export const isPointOnBorder = (options: IsPointOnBorderInterface): boolean => {
  const { matrixDimension, offset, row, column } = options;
  const maxBorder = matrixDimension - 1 - offset;
  const minBorder = offset;

  return row >= minBorder && row <= maxBorder && column >= minBorder && column <= maxBorder;
};

export const getMatrixRowByArrayIndex = (index: number, matrixDimension: number): number =>
  Math.floor(index / matrixDimension);

export const getMatrixColumnByArrayIndex = (index: number, matrixDimension: number): number =>
  index % matrixDimension;
