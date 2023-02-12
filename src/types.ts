export interface IsPointOnBorderInterface {
  row: number;
  column: number;
  offset: number;
  matrixDimension: number;
}

export type FacesType = {
  isTop: boolean;
  isLeft: boolean;
  isBottom: boolean;
  isRight: boolean;
};

export interface GetCircleElementIndexInterface {
  index: number;
  faces: FacesType;
  matrixDimension: number;
}
