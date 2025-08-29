import { VideoIcon , NotebookIcon , XIcon , ShareIcon ,DeleteIcon} from "lucide-react";

export interface CardProps {
    title: string;
    type: "youtube" | "twitter" | "linkedIn";
    link: string;
    tags : [];
}

const CardTypeVariant = {
    youtube: <VideoIcon className="w-6 h-6"/>,
    note: <NotebookIcon className="w-4 h-4" />,
    twitter: <XIcon className="w-4 h-4" />,
    linkedIn : <XIcon className="w-4 h-4" />
}


const Card = (props: CardProps) => {


    const id = props.link.split("/").pop();
    const twitterUrl = "https://twitter.com/username/status/"+id;

    return <div className="rounded-md shadow-md border-gray-200 border-2 p-2 min-w-72 max-w-96 flex-col min-h-56">
        <div className="flex justify-between">
            <div className="flex items-center gap-4"> {CardTypeVariant[props.type]} {props.title}</div>
            <div className="flex items-center gap-4"><a href={props.link} target="_blank"><ShareIcon className="w-6 h-6" /></a> <DeleteIcon className="w-6 h-6" /></div>
        </div>
        <div className="mt-4 max-w-fit">
            {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}

            {props.type === "twitter"  && <blockquote className="twitter-tweet">
  <a href={twitterUrl} ></a> 
</blockquote>}
            {props.tags && props.tags.length > 0 ? (
                <div className="flex gap-2 flex-wrap py-4 px-2">{props.tags.map((tag , index)=> <span key={index} className="border-1 rounded px-2 py-0.5 bg-gray-500 text-white">{tag}</span>)}</div>
            ) : (
                <div>No tags available</div>
            )}
        </div>
    </div>
}

export default Card