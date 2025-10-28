import clsx from "clsx";
import React from "react";
export const Button = ({ children, onClick, variant="solid", size="md", className="" })=> {
  const v = variant==="solid"?"bg-slate-900 text-white hover:bg-slate-800":variant==="outline"?"border border-slate-300 hover:bg-slate-50":"bg-transparent hover:bg-slate-100";
  const s = size==="sm"?"px-2.5 py-1.5 text-sm":"px-3 py-2";
  return <button onClick={onClick} className={clsx("rounded-xl transition", v, s, className)}>{children}</button>;
};
export default Button;
