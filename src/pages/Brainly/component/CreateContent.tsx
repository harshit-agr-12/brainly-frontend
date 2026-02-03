import { useRef, useState, useContext, useEffect } from "react";
import { X as CrossIcon, Sparkles } from "lucide-react"; // Added Sparkles icon
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { ContentContext } from "../../../contexts/contentProvider";
import DropDown from "./DropDown";

export const CreateContent = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { setContent } = useContext(ContentContext);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const linkRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const tags = ["YouTube", "Twitter", "Social", "LinkedIn", "Medium", "Article"];
  const types = ["youtube", "twitter", "article", "github", "webpage"];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false); // State for AI button
  const [errorMsg, setErrorMsg] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleType = (type: string) => {
    setSelectedType(type);
  };

  const handleAiGenerate = async () => {
    const link = linkRef.current?.value?.trim();
    if (!link) {
      setErrorMsg("⚠️ Please enter a link to generate details.");
      return;
    }

    setAiLoading(true);
    setErrorMsg("");

    // Placeholder for AI generation logic
    try {
      const { data } = await axios.post(`${apiUrl}/content/getMetaData`, {
        link: link
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });
      const type = data.type;
      const title = data.title;
      const description = data.description;
      const thumbnail = data.thumbnail;

      setThumbnail(thumbnail);


      setSelectedType(type);


      setTitle(title);
      setDescription(description.split('\n')[0]);

      setAiLoading(false);
    }catch(error){
      console.error("Error generating content details:", error);
      setErrorMsg(error.response?.data?.message || "❌ Failed to generate content details.");
      setAiLoading(false);
    }
   


  };

  async function handleSubmit() {
    const link = linkRef.current?.value?.trim();

    if (!title || !link || !selectedType) {
      setErrorMsg("⚠️ Please fill all fields and select a type.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.post(
        `${apiUrl}/content/add`,
        {
          title: title.trim(),
          link,
          type: selectedType,
          tags: selectedTags,
          thumbnail: thumbnail,
          description: description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      setContent((prev) => [...prev, data.data]); // update context
      onClose(); // close modal
    } catch (error: any) {
      console.error("Error creating content:", error);
      if (error.response?.status === 401) {
        setErrorMsg("⚠️ Please login first.");
      } else {
        setErrorMsg("❌ Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div>
      {/* Overlay - darkened and blurred */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        className="
          fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
        "
      >
        {/* Modal Card */}
        <div
          className="
                bg-gray-900 border border-gray-800 text-white rounded-2xl shadow-2xl w-full max-w-lg
                flex flex-col max-h-[90vh] overflow-y-auto animate-fadeIn
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50 sticky top-0 z-10 backdrop-blur-md rounded-t-2xl">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Add New Content
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <CrossIcon size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-6">

            {/* Link Input Section with AI Button */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Content Link</label>
              <div className="flex gap-2">
                <div className="grow">
                  <Input placeholder="Paste your link here (YouTube, Twitter, etc.)" ref={linkRef} />
                </div>
              </div>
            </div>

            {/* Title Input Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-400 ml-1">Title</label>
                <button
                  onClick={handleAiGenerate}
                  disabled={aiLoading}
                  className={`
                                text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all
                                ${aiLoading ? 'opacity-70 cursor-wait' : ''}
                            `}
                >
                  <Sparkles size={12} className={aiLoading ? "animate-spin" : ""} />
                  {aiLoading ? "Generating..." : "Auto-generate Title"}
                </button>
              </div>
              <Input placeholder="Enter a descriptive title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
              </div>
              <Input placeholder="Enter a descriptive description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {/* Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Content Type</label>
              <DropDown
                tags={types}
                text="Select Type"
                selectTag={selectedType}
                toggleTag={toggleType}
                allowCustom={false} // Explicitly false, or omit as default is false
              />
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Tags</label>
              <DropDown
                tags={tags}
                text="Select Tags"
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                allowCustom={true} // Add this prop
              />
            </div>

            {/* Error Message Area */}
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm text-center">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-2 border-t border-gray-800 bg-gray-900/50 sticky bottom-0 backdrop-blur-md rounded-b-2xl flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <Button
              variant="primary"
              text={loading ? "Saving..." : "Add Content"}
              size="md"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

