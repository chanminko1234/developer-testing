import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { MdSearch } from 'react-icons/md';
import { useLazyQuery } from '@apollo/client';
import GET_AUTOCOMPLETE_SUGGESTIONS from '@/lib/queries/getAutoCompleteSuggestions';
import useSearchParamsState from '@/hooks/useSearchParamsState';

interface Suggestion {
    title: string;
    project_name: string;
}

interface AutocompleteData {
    autocompleteProperties: Suggestion[];
}

interface AutocompleteVars {
    keyword: string;
}

const SearchBox: React.FC = () => {
    const { searchValue, setSearchValue, handleSearch, handleKeyPress } = useSearchParamsState();
    const [getAutocompleteSuggestions, { loading, data, error }] = useLazyQuery<AutocompleteData, AutocompleteVars>(GET_AUTOCOMPLETE_SUGGESTIONS);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
    const suggestionsListRef = useRef<HTMLUListElement>(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value.trim() !== '') {
            getAutocompleteSuggestions({ variables: { keyword: value } });
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchValue(suggestion);
        clearInput();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (data && data.autocompleteProperties) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedSuggestionIndex((prevIndex) =>
                    prevIndex < data.autocompleteProperties.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedSuggestionIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : data.autocompleteProperties.length - 1
                );
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (focusedSuggestionIndex >= 0 && focusedSuggestionIndex < data.autocompleteProperties.length) {
                    const suggestion = data.autocompleteProperties[focusedSuggestionIndex].project_name;
                    handleSuggestionClick(suggestion);
                } else {
                    handleSearch();
                    clearInput()
                }
            }
        }
    };

    useEffect(() => {
        if (focusedSuggestionIndex !== -1 && suggestionRefs.current[focusedSuggestionIndex]) {
            suggestionRefs.current[focusedSuggestionIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [focusedSuggestionIndex]);

    const clearInput = () => {
        setShowSuggestions(false);
        setFocusedSuggestionIndex(-1);
    };

    return (
        <div className="relative hidden md:flex bg-gray-100 w-[230px] md:w-[390px] lg:w-[600px] rounded-md h-8 sm:h-8">
            <input
                type="text"
                placeholder="Search..."
                className="sm:placeholder:text-xs pl-4 w-full bg-transparent focus:outline-none"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
            />
            <button
                onClick={handleSearch}
                className="flex items-center bg-sky-400 cursor-pointer hover:bg-blue-600 text-white text-xl px-4"
            >
                <MdSearch />
            </button>
            {loading && <div className="absolute left-0 right-0 top-8 bg-white shadow-md p-2">Loading...</div>}
            {error && <div className="absolute left-0 right-0 top-8 bg-white shadow-md p-2 text-red-500">Error: {error.message}</div>}
            {showSuggestions && data && data.autocompleteProperties && (
                <ul ref={suggestionsListRef} className="absolute left-0 right-0 top-10 bg-white shadow-md max-h-40 overflow-y-auto z-10">
                    {data.autocompleteProperties.map((suggestion: Suggestion, index: number) => (
                        <li
                            key={index}
                            ref={(el) => { suggestionRefs.current[index] = el; }}
                            className={`p-2 cursor-pointer ${index === focusedSuggestionIndex ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            onClick={() => handleSuggestionClick(suggestion.project_name)}
                        >
                            <div className="font-bold text-md">{suggestion.project_name}</div>
                            <div className="text-sm text-gray-600">{suggestion.title}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
