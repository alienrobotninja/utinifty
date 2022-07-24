const Container = ({
  children,
  className = '',
}: {
  children: JSX.Element[] | JSX.Element
  className?: string
}) => <div className={`container ${className}`}>{children}</div>

export default Container
