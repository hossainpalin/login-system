import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-gray-600">
          {label}
        </label>
      )}
      {children}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-red-500">
          <IoAlertCircleOutline />
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};
