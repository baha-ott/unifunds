interface Props  {
    children: React.ReactNode;
    className?:string;
}

function Container({children, className = ""}: Props) {
  return (
    <div className={`max-w-7xl px-8 ${className}`}>{children}</div>
  )
}

export default Container; 