import { AppStateType } from "@/redux/initialState";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const toColumn = ({
  data,
  idx,
  width,
}: {
  data: string;
  idx: number;
  width: string;
}) => {
  return `<div class="row__column" data-type="resizable" data-col = ${idx} style="width:${width}" >
            ${data}
            <div class="col-resize" data-resize="col"></div>
          </div>`;
};

const toChar = (_: string, idx: number) => {
  return String.fromCharCode(CODES.A + idx);
};

const toCell = (row: number, colState: { [key: string]: number }) => {
  return (data: string, col: number) => {
    return `<div class="row__cell" data-type="cell"  data-col = ${col} style="width:${getWidth(
      col,
      colState
    )}" data-id = ${`${row}:${col}`}  contenteditable>  ${data}</div>`;
  };
};
const withWidthFrom = (state: AppStateType) => (data: string, idx: number) => {
  return { data, idx, width: getWidth(idx, state.colState) };
};
const createRow = (
  rowState: { [key: string]: number },
  el: string,
  row: number
) => {
  return `<div class="row" data-type="resizable" data-row=${row} style="height:${getHeight(
    row,
    rowState
  )}">
    <div class="row__info">${row === 0 ? "" : row}
    <div class="row-resize" data-resize="row"></div></div>
    <div class="row__data">
     ${el}
    </div>
  </div>`;
};

export const createTable = (rowsCount = 10, state: AppStateType): string => {
  const rows = [];
  const colCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join("");

  rows.push(createRow(state.rowState, cols, 0));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colCount)
      .fill("")
      .map(toCell(row, state.colState))
      .join("");
    rows.push(createRow(state.rowState, cells, row + 1));
  }

  return rows.join("");
};

const getWidth = (col: number, colState: { [key: string]: number }) =>
  (colState[col] || DEFAULT_WIDTH) + "px";

const getHeight = (row: number, rowState: { [key: string]: number }) =>
  (rowState[row] || DEFAULT_HEIGHT) + "px";
