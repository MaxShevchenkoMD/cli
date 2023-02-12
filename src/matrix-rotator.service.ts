import {
  getMatrixColumnByArrayIndex,
  getMatrixRowByArrayIndex,
  isPointOnBorder,
} from './helpers';
import { FacesType, GetCircleElementIndexInterface } from './types';

export class MatrixRotatorService {
  protected getNextElementIndex(options: GetCircleElementIndexInterface): number {
    const { index, faces, matrixDimension } = options;

    let direction = 0;

    if (faces.isTop) {
      direction = faces.isLeft ? matrixDimension : -1;
    } else if (faces.isBottom) {
      direction = faces.isRight ? -matrixDimension : 1;
    } else if (faces.isLeft || faces.isRight) {
      direction = faces.isLeft ? matrixDimension : -matrixDimension;
    }

    return index + direction;
  }

  protected detectFaces(offsetRow: number, offsetColumn: number, offsetMatrixDimension: number): FacesType {
    return {
      isTop: !offsetRow,
      isLeft: !offsetColumn,
      isBottom: offsetRow === offsetMatrixDimension - 1,
      isRight: offsetColumn === offsetMatrixDimension - 1,
    };
  }

  public exec(array: number[]): number[] {
    const matrixDimension = Math.sqrt(array.length);

    const result: number[] = [];

    for (let i = 0; i < Math.floor(matrixDimension / 2); i++) {
      const offset = i;
      array.forEach((elem, i) => {
        const row = getMatrixRowByArrayIndex(i, matrixDimension);
        const column = getMatrixColumnByArrayIndex(i, matrixDimension);

        if (isPointOnBorder({ row, column, offset, matrixDimension })) {
          const faces = this.detectFaces(row - offset, column - offset, Math.floor(matrixDimension - offset * 2));
          const index = this.getNextElementIndex({ index: i, faces, matrixDimension });
          result[i] = array[index];
        } else {
          result[i] = result[i] || array[i];
        }
      });

    }

    return result;
  }
}
