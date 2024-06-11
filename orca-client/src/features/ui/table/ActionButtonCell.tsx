import { ComponentProps } from "react";
import { TableCell } from "./TableCell";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<typeof TableCell>;

export const ActionButtonCell = ({children, className, ...props}: Props) => {
  return ( 
  <TableCell className={twMerge('p-0', className)} {...props}>{children}</TableCell> 
);
}
 