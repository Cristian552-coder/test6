import React from "react";
export const Card = ({ children, className = "" }) => (<div className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${className}`}>{children}</div>);
export const CardHeader = ({ children, className = "" }) => (<div className={`p-4 pb-2 ${className}`}>{children}</div>);
export const CardTitle = ({ children, className = "" }) => (<div className={`text-base font-semibold ${className}`}>{children}</div>);
export const CardContent = ({ children, className = "" }) => (<div className={`p-4 pt-2 ${className}`}>{children}</div>);
export default Card;
