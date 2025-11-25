import React, {type ChangeEvent } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
}
export default class Input extends React.Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { label, value, type = "text", placeholder, error } = this.props;

    return (
      <label className="block">
        <div className="text-sm font-medium mb-1">{label}</div>

        <input
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            error ? "border-red-400" : "border-gray-300"
          }`}
          value={value}
          onChange={this.handleChange}
          type={type}
          placeholder={placeholder}
        />

        {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      </label>
    );
  }
}
