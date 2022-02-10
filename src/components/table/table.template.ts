const CODES = {
  A: 65,
  Z: 90,
};

const toColumn = () => {
  return (
    data: string,
    idx: number
  ) => `<div class="row__column" data-type="resizable" data-col = ${idx} >
            ${data}
            <div class="col-resize" data-resize="col"></div>
          </div>`;
};
const toChar = (_, idx: number) => {
  return String.fromCharCode(CODES.A + idx);
};

const toCell = (row: number) => {
  return (data: string, col: number) =>
    `<div class="row__cell" data-type="cell"  data-col = ${col} data-id = ${`${row}:${col}`}  contenteditable>  ${data}</div>`;
};

const createRow = (el: string, idx?: number) => {
  return `<div class="row" data-type="resizable" data-row=${idx} >
    <div class="row__info">${idx ?? ""}
    <div class="row-resize" data-resize="row"></div></div>
    <div class="row__data">
     ${el}
    </div>
  </div>`;
};

export const createTable = (rowsCount = 10): string => {
  const rows = [];
  const colCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colCount)
    .fill("")
    .map(toChar)
    .map(toColumn())
    .join("");

  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colCount).fill("").map(toCell(i)).join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
};
