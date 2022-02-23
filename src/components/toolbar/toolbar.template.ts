export const toButton = ({
  icon,
  active,
  value
}: {
  icon: string;
  active: boolean;
  value:{[key:string]:string | undefined}
}) => {
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(value)}'
  `
  return `
  <div ${meta} class="button ${active ? "active" : ""}" data-type="button">
  <i ${meta}  class="material-icons">${icon}</i>
</div>
`;
};

export const createToolbar = () => {
  const buttons = [
    { icon: "format_align_left", active: false, value: { textAlign: "left" } },
    { icon: "format_align_center", active: true, value: { textAlign: "center" } },
    { icon: "format_align_right", active: false, value: { textAlign: "right" } },
    { icon: "format_bold", active: false, value: { fontWeight: "bold" } },
    { icon: "format_italic", active: false, value: { fontStyle: "italic" } },
    { icon: "format_underlined", active: false, value: { textDecoration: "underline" } },
  ];

  return buttons.map(toButton).join("");
};
