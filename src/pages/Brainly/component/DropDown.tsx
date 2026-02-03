import { ChevronDown, Check, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function DropDown({ tags, text, selectedTags, toggleTag, selectTag, allowCustom = false }: {
    tags: string[],
    text: string,
    selectedTags?: string[];
    toggleTag: (arg: string) => void;
    selectTag?: string;
    allowCustom?: boolean;
}) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [customTag, setCustomTag] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Determine the label to display
    const renderLabel = () => {
        if (selectTag && selectTag !== "") {
            return <span className="text-white capitalize">{selectTag}</span>;
        }
        if (selectedTags && selectedTags.length > 0) {
            return <span className="text-white">{selectedTags.length} selected</span>;
        }
        return <span className="text-gray-400">{text}</span>;
    };

    // Merge predefined tags with any currently selected custom tags so they show up in the list
    const displayedTags = Array.from(new Set([...tags, ...(selectedTags || []), ...(selectTag ? [selectTag] : [])]));

    const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
        // Only trigger on Enter key or Click
        if ('key' in e && e.key !== 'Enter') return;
        
        const content = customTag.trim();
        if (!content) return;
        
        e.preventDefault(); 
        
        // Prevent toggling off if already selected (Add behavior should only select)
        const isAlreadySelected = selectedTags?.includes(content) || selectTag === content;
        if (!isAlreadySelected) {
            toggleTag(content);
        }

        setCustomTag("");
        
        // Auto-close for single select mode
        if (selectTag !== undefined) {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                className={`
                    w-full px-4 py-2.5 rounded-lg border text-left flex justify-between items-center transition-all duration-200 outline-none
                    ${isDropdownOpen 
                        ? "border-purple-500 ring-1 ring-purple-500 bg-gray-800" 
                        : "border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600"
                    }
                `}
                onClick={() => setIsDropdownOpen(prev => !prev)}
            >
                {renderLabel()}
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-purple-400" : ""}`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    
                    {/* INPUT FOR CUSTOM TAGS - Conditionally Rendered */}
                    {allowCustom && (
                        <div className="p-2 border-b border-gray-800 flex gap-2">
                            <input 
                                type="text"
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                onKeyDown={handleAddCustomTag}
                                placeholder="Add custom..."
                                className="w-full bg-gray-950 text-sm text-gray-200 px-3 py-2 rounded-md outline-none border border-gray-800 focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button 
                                onClick={handleAddCustomTag}
                                type="button"
                                className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-md transition-colors flex-shrink-0"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}

                    {/* LIST OF TAGS */}
                    <div className="p-1 max-h-56 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {displayedTags.map((tag) => {
                            const isSelected = selectedTags ? selectedTags.includes(tag) : tag === selectTag;
                            return (
                                <div
                                    key={tag}
                                    className={`
                                        px-3 py-2 rounded-md cursor-pointer flex items-center justify-between text-sm transition-colors capitalize mb-1 last:mb-0
                                        ${isSelected 
                                            ? "bg-purple-500/20 text-purple-200" 
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }
                                    `}
                                    onClick={() => {
                                        toggleTag(tag);
                                        if (selectTag !== undefined) {
                                            setIsDropdownOpen(false);
                                        }
                                    }}
                                >
                                    <span className="truncate">{tag}</span>
                                    {isSelected && (
                                        <Check size={14} className="text-purple-400 flex-shrink-0 ml-2" />
                                    )}
                                </div>
                            );
                        })}
                        {displayedTags.length === 0 && (
                            <div className="text-center py-8 text-gray-500 text-xs">No tags found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;