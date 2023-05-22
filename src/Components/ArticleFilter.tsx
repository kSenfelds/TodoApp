import { useState } from "react";
import "../Styles/Components/article-filter.scss";

type FilterProps = {
  options: string[];
  label: string;
  onChange: (category: string) => void;
  selectedValue: string;
}

export const ArticleFilter = ({onChange, options, label, selectedValue}: FilterProps) => {
    return (
      <div className="article-filter">
        <label>
          {label}
          <select
            onChange={(event) => {
              onChange(event.target.value);
            }}
            value={selectedValue}>
            {options.map((option) => {
              return <option key={option}>{option}</option>
            })}
          </select>
        </label>
      </div>
    )
}