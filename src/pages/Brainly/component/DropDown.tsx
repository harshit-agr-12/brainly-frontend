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
            return (
                <div className="flex items-center gap-2">
                    <span className="text-white">{selectedTags.length} selected</span>
                    <div className="flex gap-1">
                        {selectedTags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                                {tag}
                            </span>
                        ))}
                        {selectedTags.length > 2 && (
                            <span className="px-2 py-0.5 text-xs bg-slate-700 text-slate-400 rounded-full">
                                +{selectedTags.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            );
        }
        return <span className="text-slate-500">{text}</span>;
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
                    w-full px-4 py-3 rounded-xl border text-left flex justify-between items-center transition-all duration-200 outline-none
                    ${isDropdownOpen 
                        ? "border-purple-500 ring-2 ring-purple-500/20 bg-slate-800" 
                        : "border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600"
                    }
                `}
                onClick={() => setIsDropdownOpen(prev => !prev)}
            >
                {renderLabel()}
                <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-purple-400" : ""}`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                    
                    {/* INPUT FOR CUSTOM TAGS - Conditionally Rendered */}
                    {allowCustom && (
                        <div className="p-3 border-b border-slate-800 flex gap-2">
                            <input 
                                type="text"
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                onKeyDown={handleAddCustomTag}
                                placeholder="Add custom tag..."
                                className="w-full bg-slate-950 text-sm text-slate-200 px-3 py-2.5 rounded-lg outline-none border border-slate-800 focus:border-purple-500/50 transition-colors placeholder:text-slate-600"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button 
                                onClick={handleAddCustomTag}
                                type="button"
                                className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg transition-all duration-200 flex-shrink-0"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}

                    {/* LIST OF TAGS */}
                    <div className="p-2 max-h-56 overflow-y-auto custom-scrollbar">
                        {displayedTags.map((tag) => {
                            const isSelected = selectedTags ? selectedTags.includes(tag) : tag === selectTag;
                            return (
                                <div
                                    key={tag}
                                    className={`
                                        px-4 py-2.5 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-all duration-200 capitalize mb-1 last:mb-0
                                        ${isSelected 
                                            ? "bg-purple-500/20 text-purple-200 border border-purple-500/30" 
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
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
                                        <Check size={16} className="text-purple-400 flex-shrink-0 ml-2" />
                                    )}
                                </div>
                            );
                        })}
                        {displayedTags.length === 0 && (
                            <div className="text-center py-8 text-slate-500 text-sm">No tags available</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;