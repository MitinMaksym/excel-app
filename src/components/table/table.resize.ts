import { TableResizeData } from "@/redux/actions";
import { $, Dom } from "@core/dom";

export const resize = (e: MouseEvent, $root: Dom): Promise<TableResizeData> => {
  e.preventDefault();
  return new Promise((resolve) => {
    const target = e.target as HTMLElement;
    const $resizer = $(target);
    const $parent = $resizer.closest('div[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = target.dataset.resize;
    const diffProp = type === "col" ? "bottom" : "right";
    $resizer.css({ [diffProp]: "-10000px", opacity: "1" });
    let value: number;

    document.onmousemove = (event) => {
      if ($resizer.data.resize === "col") {
        const delta = event.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: -delta + "px" });
      } else {
        const delta = event.pageY - coords.bottom;
        $resizer.css({ bottom: -delta + "px" });
        value = coords.height + delta;
      }
      console.log(value);
    };

    document.onmouseup = (): void => {
      document.onmousemove = null;
      document.onmouseup = null;

      if ($resizer.data.resize === "col") {
        const cols = $root.findAll(`div[data-col="${$parent.data.col}"]`);
        cols.forEach((el) => el.css({ width: value + "px" }));
      } else {
        $parent.css({ height: value + "px" });
      }
      resolve({
        type: $resizer.data.resize,
        value: {
          [type === "col" ? $parent.data.col : $parent.data.row]: value,
        },
      });

      $resizer.css({
        right: "0",
        bottom: "0",
        opacity: "0",
      });
    };
  });
};
