interface IThemeBtnProps {
    label: string,
    type?: "button" | "submit" | "reset",
    oClassName?: string,
    clickEvent?: () => {}
};

const ThemeButton = (props: IThemeBtnProps) => {
  return (
    <button type={props?.type || "button"} className={`bg-theme hover:scale-[105%] hover:bg-theme-alt text-md font-bold text-theme-w text-center p-2 px-4 rounded-md cursor-pointer transition-all duration-300 ${props.oClassName}`}>{props.label}</button>
  )
}

export default ThemeButton