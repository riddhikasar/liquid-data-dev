"use client";

import { Play, X } from "lucide-react";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import demoVideo from "@/assets/demo-video.mp4.asset.json";

export function DemoVideoDialog({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(next) => {
      setOpen(next);
      if (!next && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] p-0 border-none bg-black overflow-hidden rounded-2xl shadow-2xl">
        <video
          ref={videoRef}
          src={demoVideo.url}
          controls
          autoPlay
          playsInline
          className="w-full h-auto max-h-[80vh] rounded-2xl"
          poster=""
        />
      </DialogContent>
    </Dialog>
  );
}

export function WatchDemoButton({ className }: { className?: string }) {
  return (
    <DemoVideoDialog>
      <button className={className}>
        <Play className="h-5 w-5" /> Watch Demo
      </button>
    </DemoVideoDialog>
  );
}
