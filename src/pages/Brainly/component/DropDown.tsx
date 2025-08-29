import { ChevronDown } from "lucide-react";
import { useState } from "react";

function DropDown({ tags , text , selectedTags  , toggleTag , selectTag}:{
    tags : string[],
    text: string,
    selectedTags? : string[];
    toggleTag : (arg:string)=>void;
    selectTag? : string
}) {

    const [isDropdownOpen , setIsDropdownOpen] = useState(Boolean);


    return (
        <div className="flex justify-center relative mt-2">
            <button
                type="button"
                className="bg-indigo-500 rounded py-2 w-[70%] px-4 text-white cursor-pointer hover:bg-indigo-700 flex justify-between items-center w-full mx-2"
                onClick={() => setIsDropdownOpen(prev=> !prev)}
            >
                <span>
                    {text}
                </span>
                <ChevronDown
                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-[70%] bg-white border border-gray-200 rounded shadow-lg z-30 max-h-48 overflow-y-auto">
                    {tags.map((tag) => {
                        const isSelected = selectedTags ? selectedTags.includes(tag) : tag==selectTag;
                        return (
                            <div
                                key={tag}
                                className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-indigo-100 ${isSelected ? "bg-indigo-200" : ""
                                    }`}
                                onClick={() => toggleTag(tag)}
                            >
                                <span>{tag}</span>
                                {isSelected && (
                                    <span className="text-indigo-700 font-bold">✓</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>)
}

export default DropDown