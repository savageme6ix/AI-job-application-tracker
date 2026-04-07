import { 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionContent, 
  cn 
} from "./Accordion";

// --- Types ---
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface Category {
  score: number;
  tips: Tip[];
}

interface Feedback {
  tone?: Category;
  toneAndStyle?: Category;
  content: Category;
  structure: Category;
  skills: Category;
}

// --- Helper Components ---

const ScoreBadge = ({ score }: { score: number }) => {
  const isGreen = score > 69;
  const isYellow = score > 39;
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
      isGreen ? "bg-green-100 text-green-700 border-green-200" :
      isYellow ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
      "bg-red-100 text-red-700 border-red-200"
    )}>
      {isGreen && <img src="/icons/check.svg" className="w-3 h-3" />}
      {score}%
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => (
  <div className="flex items-center gap-3">
    <span className="font-bold text-gray-900">{title}</span>
    <ScoreBadge score={categoryScore} />
  </div>
);

const CategoryContent = ({ tips }: { tips: Tip[] }) => (
  <div className="space-y-6">
    {/* Two-column grid for tips */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tips.map((t, i) => (
        <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
          <img 
            src={t.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
            className="w-4 h-4 mt-0.5" 
          />
          <span className="text-sm font-medium text-gray-700">{t.tip}</span>
        </div>
      ))}
    </div>

    {/* Explanation boxes */}
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Deep Dive</h4>
      {tips.map((t, i) => (
        <div key={i} className={cn(
          "p-4 rounded-xl text-sm leading-relaxed border-l-4",
          t.type === "good" 
            ? "bg-green-50/50 border-green-400 text-gray-700" 
            : "bg-red-50/50 border-red-400 text-gray-700"
        )}>
          <span className="font-bold block mb-1">{t.type === "good" ? "What's working:" : "How to fix:"}</span>
          {t.explanation}
        </div>
      ))}
    </div>
  </div>
);

// --- Main Details Component ---

export default function Details({ feedback }: { feedback: Feedback }) {
  const toneCategory = feedback.toneAndStyle ?? feedback.tone ?? { score: 0, tips: [] };
  const sections = [
    { id: "tone", title: "Tone & Style", data: toneCategory },
    { id: "content", title: "Content", data: feedback.content },
    { id: "structure", title: "Structure", data: feedback.structure },
    { id: "skills", title: "Skills", data: feedback.skills },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <div className="w-2 h-8 bg-blue-600 rounded-full" />
        Detailed Review
      </h2>

      <Accordion>
        {sections.map((section) => (
          <AccordionItem key={section.id} id={section.id}>
            <AccordionHeader id={section.id} title={section.title}>
              <CategoryHeader title={section.title} categoryScore={section.data.score} />
            </AccordionHeader>
            <AccordionContent id={section.id}>
              <CategoryContent tips={section.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
        <h3 className="font-bold text-lg mb-1">Ready to apply?</h3>
        <p className="text-blue-100 text-sm">Follow these tips to get closer to that interview!</p>
      </div>
    </div>
  );
}