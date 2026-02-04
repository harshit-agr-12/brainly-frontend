import { Plus, Share2, Search, Bell } from "lucide-react"
import Button from "./Button"
import { useState } from "react"

export default function TopBar({ onClose, onShare }: { onClose: () => void; onShare: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search your brain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-12 pr-4 py-3
                bg-slate-800/50 hover:bg-slate-800
                border border-slate-700/50 hover:border-slate-600
                focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20
                rounded-xl
                text-white placeholder-slate-500
                transition-all duration-200
                outline-none
              "
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
          </button>

          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            onClick={onShare}
            startIcon={<Share2 className="h-4 w-4" />}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            onClick={onClose}
            startIcon={<Plus className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  )
}
