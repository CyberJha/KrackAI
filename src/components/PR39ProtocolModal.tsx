import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Layers, BookOpen, ChevronRight, FileText } from 'lucide-react';

interface PR39ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PR39ProtocolModal: React.FC<PR39ProtocolModalProps> = ({ isOpen, onClose }) => {
  const [activeGroup, setActiveGroup] = useState<'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('all');

  if (!isOpen) return null;

  const patternGroups = [
    {
      group: 'A',
      title: 'Setting the Stage Instead of Stating Facts',
      patterns: [
        {
          num: 1,
          name: "It's not X, it's Y",
          rule: 'Remove false contrasts used only to elevate tone. Retain negations that correct genuine misunderstandings.',
          before: "This is not just an export button, but a brand new gateway to efficient work. It can export CSV.",
          after: "This button can export CSV.",
          note: "The error occurred during the save phase, not the upload phase."
        },
        {
          num: 2,
          name: "Single-sentence endings & dramatic fragments",
          rule: "Merge fragments that repeat the same meaning; delete endings that do not add content.",
          before: "The file is gone. It's disappeared. It can never be found again. We didn't have a backup.",
          after: "The file is lost; we did not have a backup.",
          note: "Reservation: I disagree. The current data is insufficient."
        },
        {
          num: 3,
          name: "Maxims and Pseudo-Depth",
          rule: "Return to specific judgments already present in the original text. Do not infer new arguments or metaphors.",
          before: "Collaboration is the language of efficiency. Here, collaboration refers to two editors jointly reviewing the same list.",
          after: "The collaboration here involves two editors jointly reviewing the same list.",
          note: "Retain maxims and metaphors intentionally used to aid understanding."
        },
        {
          num: 4,
          name: "Starting line preparation",
          rule: "Delete filler that only foreshadows what follows ('Let's take a closer look', 'Here's what you need to know').",
          before: "Let's take a closer look at the role of caching. Caching allows us to reuse already obtained results.",
          after: "The cache can reuse the results that have already been obtained.",
          note: "Retain genuine personal deliberation."
        },
        {
          num: 5,
          name: "Debating with a hypothetical enemy",
          rule: "Remove unsubstantiated self-justifications ('Don't misunderstand, I'm not trying to...').",
          before: "Don't misunderstand, I'm not trying to create anxiety. What I'm trying to say is that you need to confirm that a backup exists before deleting.",
          after: "Before deleting, you need to confirm that a backup exists.",
          note: "Retain genuine trade-off boundaries and limitations."
        }
      ]
    },
    {
      group: 'B',
      title: 'Formulaic Rhythm',
      patterns: [
        {
          num: 6,
          name: "Forcedly assembled three-part structure",
          rule: "Check each item to ensure it provides independent information. Only merge duplicates; do not force trios.",
          before: "This update brings innovation, breakthroughs, and entirely new possibilities. It adds export, search, and batch renaming functions.",
          after: "This update adds export, search, and batch renaming functions.",
          note: "Retain true distinct function lists."
        },
        {
          num: 7,
          name: "Repeating the beginning of a sentence",
          rule: "Merge verbose subject repetitions while preserving actions and time relationships.",
          before: "She checked the door. She checked the lock on the door. Then, she noted down two problems.",
          after: "She checked the door and the lock on it, and then noted down two problems.",
          note: "Intentional parallelism should not be forcibly changed."
        },
        {
          num: 8,
          name: "Using a dash as a universal link",
          rule: "Adjust dashes repeatedly used to create suspense or obscure relationships between clauses.",
          before: "The result finally appeared—the answer was revealed—the file could not be exported.",
          after: "The result is that the file cannot be exported.",
          note: "Retain explanatory or contrast dashes."
        },
        {
          num: 9,
          name: "Stacking of determiners",
          rule: "Compress repetitive limitations expressing the same level of uncertainty while retaining evidence bounds.",
          before: "With caching enabled, this adjustment may reduce read time, but this has not yet been verified.",
          after: "When caching is enabled, this adjustment may reduce read time, but this has not yet been verified.",
          note: "Retain legal notices and genuine corrections."
        },
        {
          num: 10,
          name: "Newly coined compound words & hyphens",
          rule: "Replace coined buzzwords with clear definitions; retain established terminology.",
          before: "We adopted an integrated 'manuscript-proofreading-publishing' mechanism, which means writing, proofreading and publishing are completed on the same page.",
          after: "We complete writing, proofreading, and publishing on the same page.",
          note: "Retain terms with specific meanings (e.g. end-to-end encryption)."
        },
        {
          num: 11,
          name: "Passive voice and missing subject",
          rule: "Adjust to active when agent is known; retain passive when agent is unknown or style requires it.",
          before: "After the editor reviewed the manuscript, the editor returned it.",
          after: "The editor reviewed the manuscript and returned it.",
          note: "Retain passive voice when agent is intentionally unstated."
        }
      ]
    },
    {
      group: 'C',
      title: 'Elevating and Leveraging Authority',
      patterns: [
        {
          num: 12,
          name: "High-frequency AI terms",
          rule: "Refine words like 'empowering', 'crucial', 'in-depth exploration', 'seamless', 'closed-loop' only when vague.",
          before: "This article will delve into a crucial question: how to retry after an export fails.",
          after: "This article discusses how to retry after an export fails.",
          note: "Retain valid engineering terms (e.g. closed-loop feedback controller)."
        },
        {
          num: 13,
          name: "Elevating the significance",
          rule: "Remove clichés such as 'marking a new era' that lack independent content.",
          before: "The team opened file export on Wednesday, marking the arrival of a new era of collaboration. Offline editing is still under development.",
          after: "The team opened file export on Wednesday. Offline editing is still under development.",
          note: "Retain genuine milestone announcements."
        },
        {
          num: 14,
          name: "Fuzzy Relationship",
          rule: "Express known roles directly; do not guess identities.",
          before: "He had close ties with the orchestra; specifically, he was in charge of the orchestra's ticketing.",
          after: "He was in charge of the orchestra's ticketing.",
          note: "Do not infer unverified identities."
        },
        {
          num: 15,
          name: "Sentence-ending supplementary elevation",
          rule: "Remove repetitive praise phrases like 'showcasing relentless pursuit...' and retain actual features.",
          before: "The page offers full-text search, showcasing the team's relentless pursuit of innovation.",
          after: "The page now offers full-text search.",
          note: "Retain actual reader utility statements."
        },
        {
          num: 16,
          name: "Slogan and empty praise",
          rule: "Reduce empty praise and retain the actual features provided in the original text.",
          before: "This coffee shop is located in the center of town and has a unique decor, making it a dream paradise for coffee lovers.",
          after: "This coffee shop is located in the center of town and has a unique decor.",
          note: "Keep subjective evaluations as evaluations rather than objective facts."
        },
        {
          num: 17,
          name: "Leveraging authority",
          rule: "Do NOT replace 'experts believe' with fabricated institutions or dates; preserve uncertainty boundaries.",
          before: "Some unnamed experts believe that this design may reduce misoperation and fully demonstrate its significant value.",
          after: "Some unnamed experts believe this design may reduce misoperation.",
          note: "Do not invent credentials for unverified claims."
        },
        {
          num: 18,
          name: "Avoid using 'is/exists'",
          rule: "Simplify linking verbs while strictly preserving quantity, comparisons, and scope.",
          before: "This space, used as an exhibition venue, has four independent exhibition areas with a total area of over 3,000 square feet.",
          after: "This space is an exhibition venue with four independent exhibition areas, totaling over 3,000 square feet.",
          note: "Preserve exact numbers and conditions."
        }
      ]
    },
    {
      group: 'D',
      title: 'Formulaic Typesetting & Clean Punctuation',
      patterns: [
        {
          num: 19,
          name: "Bold text as decoration",
          rule: "Reduce decorative bolding, retaining only key anchors for visual scanning.",
          before: "**Supported** CSV (comma-separated values) and **JSON export**.",
          after: "Supports CSV (comma-separated values) and JSON export.",
          note: "Retain key warning actions and crucial data anchors."
        },
        {
          num: 20,
          name: "Decorative Headlines",
          rule: "Remove emojis, arrows, and separators that obstruct reading; preserve document anchors.",
          before: "🚀 Release schedule: The product is planned for release in the third quarter.",
          after: "Release schedule: The product is planned for release in the third quarter.",
          note: "Retain flow arrows that carry procedural meaning."
        },
        {
          num: 21,
          name: "Quotation marks & punctuation",
          rule: "Standardize clean target punctuation; code blocks, URLs, and structured data remain unchanged.",
          before: 'He said "the project is progressing well," but others disagreed.',
          after: 'He said, "The project is progressing well," but others disagreed.',
          note: "Preserve JSON quotes and exact code syntax."
        }
      ]
    },
    {
      group: 'E',
      title: 'Chat & Draft Remnants',
      patterns: [
        {
          num: 22,
          name: "Customer service tone",
          rule: "Remove empty greetings ('Good question!', 'Hope this helps!') from standalone articles.",
          before: "Good question! This is the description of the export function. It supports CSV. Hope this helps!",
          after: "The export function supports CSV.",
          note: "Retain appropriate email greetings and closures."
        },
        {
          num: 23,
          name: "Knowledge boundary disclaimer & guessing filling",
          rule: "Remove duplicate disclaimers; do not disguise speculation as real records.",
          before: "The existing materials do not record the company's establishment date. Information available on this point is indeed quite limited.",
          after: "The existing materials do not record the company's establishment date.",
          note: "Retain author's original uncertainty bounds."
        },
        {
          num: 24,
          name: "Repeat the title in the first sentence",
          rule: "Delete title restatements that lack independent meaning.",
          before: "This section introduces export limitations. The following explains the export limitations. The maximum size is 10 MB.",
          after: "This section describes export limitations. The maximum file size is 10 MB.",
          note: "Retain definitions and data following headings."
        },
        {
          num: 25,
          name: "Discuss the previous draft",
          rule: "Delete editing notes like 'What was changed earlier' unless part of a changelog.",
          before: "This paragraph is a newly added explanation, which states that the maximum file size is 10 MB.",
          after: "The maximum file size is 10 MB.",
          note: "Preserve actual changelog diff notes."
        }
      ]
    },
    {
      group: 'F',
      title: 'Supplementary Multilingual & Syntactic Checks',
      patterns: [
        {
          num: 26,
          name: "Layered modifier structures",
          rule: "Streamline convoluted modifier structures while preserving exact modifying relationships.",
          before: "This is a complete solution for fine-tuning a small open-source model with one billion parameters.",
          after: "This is a complete fine-tuning scheme suitable for a small open-source model with one billion parameters.",
          note: "Preserve precise attribution and scope."
        },
        {
          num: 27,
          name: "'Continue + Verb'",
          rule: "Use direct active verbs while preserving progress, completed, and planned statuses.",
          before: "We are conducting a full system test and plan to make configuration adjustments on Friday.",
          after: "We are conducting a full system test and plan to adjust the configuration on Friday.",
          note: "Retain explicit completion status."
        },
        {
          num: 28,
          name: "Stacking of passive voice phrases",
          rule: "Maintain attribution and degree of certainty when adjusting passive sentences.",
          before: "This issue has been reported multiple times and is thought to be possibly related to a memory leak, but the cause has not yet been confirmed.",
          after: "This issue has been reported multiple times. It is believed to be possibly related to a memory leak, but the cause has not yet been confirmed.",
          note: "Preserve unverified causes as unverified."
        },
        {
          num: 29,
          name: "Parallelism of four-character phrases",
          rule: "Refine forced rhythmic parallelism without deleting independent constraints.",
          before: "The solution is stable, reliable, fast-responding, and easy to maintain.",
          after: "This solution is stable, responds quickly, and is easy to maintain.",
          note: "Preserve distinct technical constraints."
        },
        {
          num: 30,
          name: "Beginnings with 'With the development of...'",
          rule: "Compress empty context beginnings that lack independent background information.",
          before: "In the context of continuous technological development, this article discusses manuscript proofreading.",
          after: "This article discusses manuscript proofreading.",
          note: "Retain true trends and temporal contexts."
        },
        {
          num: 31,
          name: "Using stock phrases to end",
          rule: "Remove uninformative wishes; retain summaries, sentiments, and actionable next steps.",
          before: "In short, let's wait and see, and look forward to more possibilities. The team plans to continue testing on Friday.",
          after: "The team plans to continue testing on Friday.",
          note: "Retain concrete testing schedules."
        }
      ]
    }
  ];

  const filteredGroups = activeGroup === 'all' 
    ? patternGroups 
    : patternGroups.filter(g => g.group === activeGroup);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-black/80 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="surface-card rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative border dark:border-white/10 border-[#d8c496] glass-card">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/10 border-[#d8c496] surface-deep">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fa520f]/20 to-[#ff8a00]/10 flex items-center justify-center text-[#fa520f] border border-[#fa520f]/30 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-[#fa520f]">
                  PR-39 Factual Fidelity & 31 Pattern Checkpoints
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#fa520f]/20 text-[#fa520f]">
                  4-Tier Hierarchy
                </span>
              </div>
              <p className="text-xs dark:text-white/70 text-black font-semibold">
                Extreme factual certainty preservation, author voice matching, and forensic AI-pattern elimination.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#fa520f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Tier Hierarchy Bar */}
        <div className="px-6 py-3 bg-[#fa520f]/10 border-b dark:border-white/10 border-[#d8c496] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5 font-bold text-[#fa520f]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Conflict Priority Order:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border dark:border-white/10 border-[#d8c496] dark:text-white text-black">
              1. Information & Certainty
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#fa520f]" />
            <span className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border dark:border-white/10 border-[#d8c496] dark:text-white text-black">
              2. Scope & Style
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#fa520f]" />
            <span className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border dark:border-white/10 border-[#d8c496] dark:text-white text-black">
              3. Author's Voice
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#fa520f]" />
            <span className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border dark:border-white/10 border-[#d8c496] dark:text-white text-black">
              4. 31 Expression Checkpoints
            </span>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="px-6 py-3 border-b dark:border-white/10 border-[#d8c496] surface-deep flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setActiveGroup('all')}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer font-bold ${
              activeGroup === 'all'
                ? 'bg-gradient-to-r from-[#fa520f] to-[#ff6a00] text-white shadow-sm'
                : 'tag-chip text-black dark:text-white hover:border-[#fa520f]'
            }`}
          >
            All 31 Patterns
          </button>
          {[
            { id: 'A', label: 'A. Staging (1-5)' },
            { id: 'B', label: 'B. Rhythm (6-11)' },
            { id: 'C', label: 'C. Authority (12-18)' },
            { id: 'D', label: 'D. Typesetting (19-21)' },
            { id: 'E', label: 'E. Chat Remnants (22-25)' },
            { id: 'F', label: 'F. Multilingual (26-31)' },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id as any)}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer font-bold ${
                activeGroup === g.id
                  ? 'bg-gradient-to-r from-[#fa520f] to-[#ff6a00] text-white shadow-sm'
                  : 'tag-chip text-black dark:text-white hover:border-[#fa520f]'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Pattern List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {filteredGroups.map((grp) => (
            <div key={grp.group} className="space-y-4">
              <div className="flex items-center space-x-2 border-b dark:border-white/10 border-[#d8c496] pb-2">
                <span className="font-mono font-extrabold text-xs px-2 py-0.5 rounded bg-[#fa520f] text-white">
                  Group {grp.group}
                </span>
                <h4 className="font-serif font-bold text-base dark:text-white text-black">
                  {grp.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grp.patterns.map((p) => (
                  <div
                    key={p.num}
                    className="p-4 rounded-2xl border dark:border-white/10 border-[#d8c496] surface-deep space-y-3 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="text-xs font-mono font-extrabold text-[#fa520f]">#{p.num}</span>
                        <h5 className="font-sans font-bold text-sm dark:text-white text-black">
                          {p.name}
                        </h5>
                      </div>
                      <p className="text-xs dark:text-white/80 text-black font-medium leading-relaxed">
                        {p.rule}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t dark:border-white/10 border-[#d8c496] text-xs font-mono">
                      <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300">
                        <span className="font-bold text-[10px] uppercase block text-rose-600 dark:text-rose-400">Before:</span>
                        <span className="text-[11px] leading-relaxed">{p.before}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300">
                        <span className="font-bold text-[10px] uppercase block text-emerald-600 dark:text-emerald-400">After Humanizing:</span>
                        <span className="text-[11px] leading-relaxed">{p.after}</span>
                      </div>
                      {p.note && (
                        <div className="text-[10px] dark:text-white/60 text-black font-semibold italic">
                          Boundary: {p.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-white/10 border-[#d8c496] surface-deep flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <span className="dark:text-white/70 text-black font-bold">
            Pre-Delivery Verification: 100% factual accuracy, zero hallucinated facts/dates, 0% AI risk signature.
          </span>
          <button
            onClick={onClose}
            className="btn-mistral text-xs h-9 px-4 shrink-0 cursor-pointer"
          >
            Close Protocol Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
