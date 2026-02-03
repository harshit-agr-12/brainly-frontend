import { createContext, useState, type Dispatch,type SetStateAction } from "react";
import type { PropsWithChildren } from "react";

// Define the content type
interface Content {
  title: string;
  type: string;
  link: string;
  tags? : string[];
  thumbnail? : string;
  description? : string;
}

interface ContentContextType {
  content: Content[];
  setContent: Dispatch<SetStateAction<Content[]>>;
}

// Default values for the context
export const ContentContext = createContext<ContentContextType>({
  content: [{ title: "", type: "youtube", link: "", thumbnail: "", description: "", tags: [] }],
  setContent: () => {},
});

export function ContentProvider({ children }: PropsWithChildren) {
  const [content, setContent] = useState<Content[]>([{
    title: "",
    type: "youtube",
    link: "",
    tags: [],
    thumbnail: "",
    description: ""
  }]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}
