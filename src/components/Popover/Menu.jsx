import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Menu.css";
const DropdownMenuDemo = ({
  title1,
  title2,
  icon,
  rightslot,
  rightslot2,
  userClicked,
  userClicked2,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          {icon}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => userClicked()}
          >
            {title1}
            <div className="RightSlot">{rightslot}</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => {
              userClicked2();
            }}
          >
            {title2}
            <div className="RightSlot">{rightslot2}</div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
