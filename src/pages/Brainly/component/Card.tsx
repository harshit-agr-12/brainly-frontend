import { VideoIcon , NotebookIcon , XIcon , ShareIcon ,DeleteIcon} from "lucide-react";
import { useContext } from "react";
import { ContentContext } from "../../../contexts/contentProvider";
import axios from "axios";

interface CardProps {
  id : string;
  title: string;
  type?: string;
  link: string;
  tags?: string[];
  thumbnail?: string;
  description? : string;
}

const Card = ({ id, title, type, link, tags, thumbnail, description }: CardProps) =>{

    const apiUrl = import.meta.env.VITE_API_URL;

    const getIcon = () => {
        switch (type) {
          case "video":
            return <VideoIcon className="w-6 h-6 text-gray-500" />;
          case "document":
            return <NotebookIcon className="w-6 h-6 text-gray-500" />;
          default:
            return null;
        }
      };

    const { content, setContent } = useContext(ContentContext)

      function handleDelete() {
        // You can add any logic here if needed when deleting the content
        setContent(content.filter(item => item._id !== id));
        try{
            axios.delete(`${apiUrl}/content/remove/${id}`, {
                headers: {  
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                }
            });
        }catch(error){
            console.error("Error deleting content:", error);
        }
    };  

    return (
        <div className="w-[300px] bg-gray-800 rounded-lg shadow-md p-4 relative">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
          ) : (
            <div className="w-full h-40 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              {getIcon()}
            </div>
          )}
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags && tags.map((tag, index) => (
              <span key={index} className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Content</a>
          <div className="absolute top-2 right-2 flex gap-2">
            <DeleteIcon className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleDelete} />
          </div>
        </div>
      );
}

export default Card