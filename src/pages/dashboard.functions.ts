import { AppStateType } from "@/redux/initialState";
import { storage } from "@core/utils";
export const toHTML = (record: AppStateType, path: string) => {
  return `
  <li class="db__record">
    <a href="#${path}">${record.title}</a>
    <strong>${new Date(record.openedAt).toLocaleDateString()}
      ${new Date(record.openedAt).toLocaleTimeString()}
    </strong>
  </li>
  `;
};
export const getKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i)?.includes("excel")) {
      continue;
    }
    keys.push(localStorage.key(i) as string);
  }
  return keys;
};
export const createTableItems = () => {
  const keys = getKeys();
  if (keys.length < 1) {
    return "<p>Вы не создали ни одного документа</p>";
  }
  return ` <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>
          <ul class="db__list">
            ${keys
              .map((key) => {
                return toHTML(storage(key), key);
              })
              .join("")}
          </ul>`;
};
