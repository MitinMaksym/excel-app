export function capitalizeName(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(current: number, target: number) {
  let [start, end] = [current, target];
  if (end < start) {
    [end, start] = [current, target];
  }

  return new Array(end - start + 1).fill("").map((el, idx) => {
    return start + idx;
  });
}

export const storage = (key: string, data?: string) => {
  if (!data) {
    return localStorage.getItem(key);
  }
  localStorage.setItem(key, JSON.stringify(data));
};
