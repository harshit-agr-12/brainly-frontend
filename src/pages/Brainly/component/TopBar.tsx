import { Plus, Share } from "lucide-react"
import Button from "./Button"

export default function TopBar({ onClose, onShare }: { onClose: () => void; onShare: () => void }) {

  return (
    <div className="h-fit w-full flex flex-wrap gap-2 px-2 py-2 items-center justify-end border-b border-gray-200 sm:justify-between">
      {/* Left side: Optional title or space */}
      <div className="hidden sm:block text-lg font-semibold">
        {/* You can add a title here if needed */}
      </div>

      {/* Right side: Buttons */}
      <div className="flex  mx-auto">
        <Button
          variant="primary"
          size="md"
          text="Add Content"
          onClick={onClose}
          startIcon={<Plus className="h-5 w-5" />}
        />
        <Button
          variant="secondary"
          size="md"
          text="Share Brain"
          onClick={onShare}
          startIcon={<Share className="h-5 w-5" />}
        />
      </div>
    </div>
  )
}
