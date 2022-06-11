import { initialStyles } from "./Toolbar";

export const toButton = ({
  icon,
  active,
  value,
}: {
  icon: string;
  active: boolean;
  value: { [key: string]: string | undefined };
}) => {
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(value)}'
  `;
  return `
  <div ${meta} class="button ${active ? "active" : ""}" data-type="button">
  <i ${meta}  class="material-icons">${icon}</i>
</div>
`;
};

export const createToolbar = ({
  textAlign,
  fontWeight,
  fontStyle,
  textDecoration,
}: typeof initialStyles) => {
  const buttons = [
    {
      icon: "format_align_left",
      active: textAlign === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "format_align_center",
      active: textAlign === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "format_align_right",
      active: textAlign === "right",
      value: { textAlign: "right" },
    },
    {
      icon: "format_bold",
      active: fontWeight === "bold",
      value: { fontWeight: fontWeight === "bold" ? "normal" : "bold" },
    },
    {
      icon: "format_italic",
      active: fontStyle === "italic",
      value: { fontStyle: fontStyle === "italic" ? "normal" : "italic" },
    },
    {
      icon: "format_underlined",
      active: textDecoration === "underline",
      value: {
        textDecoration: textDecoration === "underline" ? "none" : "underline",
      },
    },
  ];

  return buttons.map(toButton).join("");
};
