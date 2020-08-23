export function When<T>({
  children,
  ...props
}: Exclude<T, 'children'> & { children: (props: Omit<T, 'children'>) => any }) {
  return children(props);
}
