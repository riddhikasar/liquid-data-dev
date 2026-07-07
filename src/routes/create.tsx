import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mic, Pencil, RotateCcw, AlertTriangle, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Orb } from "@/components/Orb";
import { generateRecipe } from "@/lib/recipe.functions";
import { setCurrent } from "@/lib/library-store";


export const Route = createFileRoute("/create")({ component: Create });

type Stage = "input" | "processing";

// Minimal typing for the Web Speech API to keep the file self-contained.
type SpeechRecResult = { transcript: string };
type SpeechRecAlt = { 0: SpeechRecResult; isFinal: boolean };
type SpeechRecEvent = { resultIndex: number; results: ArrayLike<SpeechRecAlt> };
type SpeechRec = {
  lang: string; interimResults: boolean; continuous: boolean;
  start: () => void; stop: () => void;
  onresult: ((e: SpeechRecEvent) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

function Create() {
  const navigate = useNavigate();
  const runRecipe = useServerFn(generateRecipe);
  const [stage, setStage] = useState<Stage>("input");
  const [mode, setMode] = useState<"voice" | "text">("text");
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const recogRef = useRef<SpeechRec | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRec; webkitSpeechRecognition?: new () => SpeechRec };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = "en-US"; r.interimResults = true; r.continuous = true;
    r.onresult = (e) => {
      let final = ""; let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i];
        if (chunk.isFinal) final += chunk[0].transcript;
        else interim += chunk[0].transcript;
      }
      setText((prev) => (final ? (prev + final).trim() + " " : prev.replace(/\s+$/, "") + " " + interim).replace(/\s+/g, " "));
    };
    r.onerror = () => { setErr("Didn't catch that. Could you please repeat?"); setListening(false); };
    r.onend = () => setListening(false);
    recogRef.current = r;
    return () => { try { r.stop(); } catch {} };
  }, []);

  const toggleMic = () => {
    setErr(null);
    if (!recogRef.current) { setMode("text"); setErr("Voice not supported in this browser — type it instead."); return; }
    if (listening) { recogRef.current.stop(); setListening(false); }
    else { setMode("voice"); try { recogRef.current.start(); setListening(true); } catch {} }
  };

  const submit = async () => {
    const memory = text.trim();
    if (memory.length < 3) { setErr("Tell us a little more about the memory."); return; }
    if (listening) { try { recogRef.current?.stop(); } catch {} setListening(false); }
    setStage("processing");
    try {
      const recipe = await runRecipe({ data: { memory } });
      setCurrent(recipe);
      navigate({ to: "/recipe" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setStage("input");
    }
  };

  if (stage === "processing") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <TopNav />
        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">Transforming Your Memory into Liquid Data…</h1>
        <div className="my-14"><Orb size={240} palette={["#ffb3d9", "#c39bff", "#8ec5ff"]} liquid /></div>
        <div className="flex items-center gap-6 max-w-2xl text-muted-foreground italic">
          <button onClick={() => setStage("input")} className="h-9 w-9 rounded-full border border-border bg-white flex items-center justify-center" aria-label="Cancel"><X className="h-4 w-4" /></button>
          <p className="flex-1"><span className="text-shimmer">{text}</span></p>
          <button onClick={() => setStage("input")} className="h-9 w-9 rounded-full border border-border bg-white flex items-center justify-center" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <TopNav />
      <h1 className="text-4xl md:text-5xl font-semibold text-center max-w-2xl">Which Memory Do You Want To Experience?</h1>

      <div className="my-14"><Orb size={200} palette={["#ffb3d9", "#c39bff", "#8ec5ff"]} pulsing={listening} /></div>

      <div className="w-full max-w-3xl flex items-center gap-6">
        <button onClick={() => setText("")} className="h-14 w-14 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0" aria-label="Reset">
          <RotateCcw className="h-5 w-5" />
        </button>
        <div className="flex-1 relative rounded-2xl border border-border bg-white/90 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
          {mode === "text" || !recogRef.current ? (
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe a memory you'd like to taste… A moment of joy, nostalgia, or a feeling you want to relive."
              className="w-full min-h-[110px] resize-none bg-transparent text-base md:text-lg placeholder:text-muted-foreground/60 px-5 py-4 rounded-2xl focus:outline-none"
            />
          ) : (
            <p className="min-h-[110px] text-base md:text-lg px-5 py-4">
              {text || <span className="text-muted-foreground/60">Listening… speak a memory you'd like to taste.</span>}
            </p>
          )}
        </div>
        <button
          onClick={submit}
          className="btn-primary h-14 w-14 rounded-full flex items-center justify-center shrink-0"
          aria-label="Submit memory"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>


      {err && (
        <div className="mt-6 flex items-center gap-3 px-5 py-3 rounded-full border border-primary/40 text-primary bg-white animate-slide-fade">
          <AlertTriangle className="h-4 w-4" />
          <span className="italic text-sm">{err}</span>
        </div>
      )}

      <div className="mt-10 inline-flex rounded-full bg-white shadow-sm border border-border p-1">
        <button
          onClick={() => { if (listening) { try { recogRef.current?.stop(); } catch {}; setListening(false); } setMode("text"); }}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition ${mode === "text" ? "btn-primary" : "text-muted-foreground hover:text-foreground"}`}
          aria-pressed={mode === "text"}
        >
          <Pencil className="h-4 w-4" /> Type
        </button>
        <button
          onClick={toggleMic}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition ${mode === "voice" ? "btn-primary" : "text-muted-foreground hover:text-foreground"}`}
          aria-pressed={mode === "voice"}
        >
          <Mic className="h-4 w-4" /> {listening ? "Listening…" : "Speak"}
        </button>
      </div>
    </div>
  );
}

