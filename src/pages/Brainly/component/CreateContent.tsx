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

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const tags = ["youtube", "twitter", "social", "LinkedIn", "medium", "Article"];
  const types = ["youtube", "twitter", "medium"];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

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
      alert("Please fill all fields and select a type");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://brainly-backend-1-td5h.onrender.com/api/v1/content",
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
      setContent((prev: any) => [...prev, data]);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error creating content first loginin");
    }
  }

  // Log selected tags (optional for debugging)
  useEffect(() => {
    console.log("Selected Tags:", selectedTags);
  }, [selectedTags]);

  return (
    <div>
      {open && (
        <div>
          {/* Overlay */}
          <div
            className="z-10 fixed bg-slate-500 h-screen w-screen opacity-60"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div
            className="
              z-20 fixed flex flex-col bg-white p-4 rounded-lg shadow-lg
              w-[90%] sm:w-[80%] md:w-[500px]
              max-h-[90vh] overflow-y-auto
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            "
          >
            {/* Close button */}
            <div className="flex justify-end p-2">
              <span
                onClick={onClose}
                className="cursor-pointer bg-gray-200 rounded p-1 hover:bg-gray-300 transition-colors"
              >
                <CrossIcon size={20} />
              </span>
            </div>

            {/* Inputs */}
            <div className="w-full flex flex-col items-center gap-3">
              <Input placeholder="Title" ref={titleRef} />
              <Input placeholder="Link" ref={linkRef} />
            </div>

            {/* Dropdowns */}
            <h1 className="text-center py-2 text-lg sm:text-xl font-semibold">
              Tags
            </h1>
            <DropDown
              tags={tags}
              text="Select Tags"
              selectedTags={selectedTags}
              toggleTag={toggleTag}
            />

            <h1 className="text-center py-2 text-lg sm:text-xl font-semibold">
              Type
            </h1>
            <DropDown
              tags={types}
              text="Select Type"
              selectTag={selectedType}
              toggleTag={toggleType}
            />

            {/* Submit */}
            <div className="flex justify-center p-4">
              <Button
                variant="primary"
                text="Submit"
                size="md"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

