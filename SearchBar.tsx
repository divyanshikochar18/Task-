import React, { useState, useEffect } from 'react';
import { Doctor } from '../hooks/useDoctors';

interface Props {
  search: string;
  onSearch: (val: string) => void;
  doctors: Doctor[];
}

const SearchBar: React.FC<Props> = ({ search, onSearch, doctors }) => {
  const [input, setInput] = useState(search);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (input) {
      const matches = doctors
        .filter(doc => doc.name.toLowerCase().includes(input.toLowerCase()))
        .map(doc => doc.name)
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input, doctors]);

  const handleSelect = (name: string) => {
    setInput(name);
    setSuggestions([]);
    onSearch(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
    setSuggestions([]);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="autocomplete-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Search doctor..."
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="border rounded mt-1 bg-white">
          {suggestions.map((name, idx) => (
            <li
              key={idx}
              data-testid="suggestion-item"
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
