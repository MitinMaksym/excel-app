export const toButton = ({
  icon,
  active,
}: {
  icon: string;
  active: boolean;
}) => {
  return `
  <div class="button ${active ? "active" : ""}" data-type="button">
  <i class="material-icons">${icon}</i>
</div>
`;
};

export const createToolbar = () => {
  const buttons = [
    { icon: "format_align_left", active: false },
    { icon: "format_align_center", active: true },
    { icon: "format_align_right", active: false },
    { icon: "format_bold", active: false },
    { icon: "format_italic", active: false },
    { icon: "format_underlined", active: false },
  ];

  return buttons.map(toButton).join("");
};
