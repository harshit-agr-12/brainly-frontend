import { Trash2, ExternalLink, Youtube, Twitter, Globe, FileText, Github } from "lucide-react";
import { useContext, useState } from "react";
import { ContentContext } from "../../../contexts/contentProvider";
import axios from "axios";

interface CardProps {
  id: string;
  title: string;
  type?: string;
  link: string;
  tags?: string[];
  thumbnail?: string;
  description?: string;
}

const Card = ({ id, title, type, link, tags, thumbnail, description }: CardProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypeIcon = () => {
    const iconClass = "w-5 h-5";
    switch (type?.toLowerCase()) {
      case "youtube":
        return <Youtube className={`${iconClass} text-red-500`} />;
      case "twitter":
        return <Twitter className={`${iconClass} text-sky-400`} />;
      case "article":
        return <FileText className={`${iconClass} text-emerald-400`} />;
      case "github":
        return <Github className={`${iconClass} text-slate-300`} />;
      case "webpage":
        return <Globe className={`${iconClass} text-blue-400`} />;
      default:
        return <Globe className={`${iconClass} text-purple-400`} />;
    }
  };

  const getTypeColor = () => {
    switch (type?.toLowerCase()) {
      case "youtube":
        return "from-red-500/20 to-red-600/10 border-red-500/30";
      case "twitter":
        return "from-sky-500/20 to-sky-600/10 border-sky-500/30";
      case "article":
        return "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30";
      case "github":
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30";
      default:
        return "from-purple-500/20 to-indigo-600/10 border-purple-500/30";
    }
  };

  const { content, setContent } = useContext(ContentContext);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    
    try {
      await axios.delete(`${apiUrl}/content/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });
      setContent(content.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
      setIsDeleting(false);
    }
  }

  return (
    <div
      className={`
        group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 
        border border-slate-700/50 hover:border-purple-500/50
        rounded-2xl overflow-hidden transition-all duration-500
        hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1
        ${isDeleting ? 'opacity-50 scale-95' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Preview */}
      <div className="relative h-44 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getTypeColor()} flex items-center justify-center`}>
            <div className="p-4 bg-slate-800/50 rounded-2xl backdrop-blur-sm">
              {getTypeIcon()}
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full border ${getTypeColor().split(' ')[2]}`}>
            {getTypeIcon()}
            <span className="text-xs font-medium text-slate-200 capitalize">{type || 'Link'}</span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            absolute top-3 right-3 p-2 rounded-full
            bg-slate-900/80 backdrop-blur-sm border border-slate-700/50
            text-slate-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium bg-slate-700/50 text-slate-400 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2 w-full py-2.5 mt-3
            bg-gradient-to-r from-purple-600/20 to-indigo-600/20
            hover:from-purple-600 hover:to-indigo-600
            border border-purple-500/30 hover:border-transparent
            rounded-xl text-sm font-medium text-purple-300 hover:text-white
            transition-all duration-300 group/btn
          "
        >
          <span>Open Link</span>
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

export default Card