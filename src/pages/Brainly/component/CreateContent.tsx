import { useRef, useState, useContext, useEffect } from "react";
import { X as CrossIcon } from "lucide-react";
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

  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const tags = ["YouTube", "Twitter", "Social", "LinkedIn", "Medium", "Article"];
  const types = ["youtube", "twitter", "medium"];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleType = (type: string) => {
    setSelectedType(type);
  };

  async function handleSubmit() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();

    if (!title || !link || !selectedType) {
      setErrorMsg("⚠️ Please fill all fields and select a type.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.post(
        `${apiUrl}/api/v1/content`,
        {
          title,
          link,
          type: selectedType,
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      setContent?.((prev: any) => [...prev, data]); // update context
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

  // Debugging logs for tags (optional)
  useEffect(() => {
    console.log("Selected Tags:", selectedTags);
  }, [selectedTags]);

  if (!open) return null;

  return (
    <div>
      {/* Overlay */}
      <div
        className="z-10 fixed bg-slate-500 h-screen w-screen opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="
          z-20 fixed flex flex-col bg-white p-4 rounded-2xl shadow-xl
          w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]
          max-h-[90vh] overflow-y-auto
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">➕ Add New Content</h2>
          <button
            onClick={onClose}
            className="cursor-pointer bg-gray-200 rounded p-1 hover:bg-gray-300 transition-colors"
          >
            <CrossIcon size={20} />
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <Input placeholder="Enter title" ref={titleRef} />
          <Input placeholder="Enter link" ref={linkRef} />
        </div>

        {/* Tag Selector */}
        <DropDown
          tags={tags}
          text="Select Tags"
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />

        <DropDown
          tags={types}
          text="Select Type"
          selectTag={selectedType}
          toggleTag={toggleType}
        />

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
        )}

        {/* Submit */}
        <div className="flex justify-center p-4">
          <Button
            variant="primary"
            text={loading ? "Submitting..." : "Submit"}
            size="md"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

