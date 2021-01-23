const CODES = {
  A: 65,
  Z: 90,
};

const toColumn = (data: string) => {
  return `<div class="row__column">${data}</div>`;
};
const toChar = (_, idx: number) => {
  return String.fromCharCode(CODES.A + idx);
};

const toCell = (data = "2") => {
  return `<div class="row__cell  contenteditable">  ${data}</div>`;
};

const createRow = (el: string, idx?: number) => {
  return `<div class="row">
    <div class="row__info">${idx ?? ""}</div>
    <div class="row__data">
     ${el}
    </div>
  </div>`;
};

export const createTable = (rowsCount = 10): string => {
  const rows = [];
  const colCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colCount).fill("").map(toChar).map(toColumn).join("");
  const cells = new Array(colCount).fill("").map(toCell).join("");
  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
};
