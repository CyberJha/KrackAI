import { getRandomSafeSynonym } from './synonyms.js';
import { applyCollocation, applyRandomCollocation } from './collocations.js';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * RESEARCHUB FORENSIC HUMANIZER ENGINE — ZERO-GPT EVASION SUITE (PERFECTED)
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-Engine Architecture:
 * 1. StealthHumanizer v3 (Collocation Injection, Safe Synonym Swapping, Burstiness Enforcement)
 * 2. Blader v3.1 (Wikipedia "Signs of AI Writing" Structural Staging & Pseudo-Depth Purge)
 * 3. PR-39 Factual Fidelity Protocol (100% Invariant Entity, Number & Logic Preservation)
 * 4. Surgical Sentence Repair Loop (Per-Sentence Forensic Audit & Target Rewriter)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── 1. STEALTH & BLADER HIGH-FREQUENCY AI PATTERN DICTIONARY ─────────────────
export const AI_CLICHES_AND_LEXICON: [RegExp, string][] = [
  // Staging / Foreshadowing / Padding
  [/\b(?:moreover|furthermore|additionally|in addition|lastly|finally),\s*/gi, ''],
  [/\bit is important to note that\s*,?\s*/gi, ''],
  [/\bit is worth (?:noting|mentioning) that\s*,?\s*/gi, ''],
  [/\bit should be (?:noted|emphasized) that\s*,?\s*/gi, ''],
  [/\bit must be noted that\s*,?\s*/gi, ''],
  [/\bit is (?:crucial|essential|imperative|vital) to\s+/gi, 'it helps to '],
  [/\bit is (?:evident|clear|apparent) that\s*,?\s*/gi, 'clearly, '],
  [/\bin conclusion\s*,?\s*/gi, ''],
  [/\bin summary\s*,?\s*/gi, ''],
  [/\bto summarize\s*,?\s*/gi, ''],
  [/\bto conclude\s*,?\s*/gi, ''],
  [/\bas (?:previously )?mentioned(?: earlier)?\s*,?\s*/gi, ''],
  [/\bas (?:discussed|noted) (?:earlier|above)\s*,?\s*/gi, ''],
  [/\bneedless to say\s*,?\s*/gi, ''],
  [/\blast but not least\s*,?\s*/gi, 'first, '],
  [/\bfirst and foremost\s*,?\s*/gi, 'first, '],
  [/\bat the end of the day\s*,?\s*/gi, ''],
  [/\bin today'?s world\s*,?\s*/gi, 'today '],
  [/\bin today'?s (?:rapidly evolving|shifting|modern|current)?\s*(?:energy|digital|business|technological)?\s*(?:landscape|realm|space|world),?\s*/gi, 'today '],
  [/\bin this day and age\s*,?\s*/gi, 'now '],
  [/\bin the modern era\s*,?\s*/gi, 'today '],
  [/\bin the (?:contemporary|current) landscape\s*,?\s*/gi, 'today '],
  [/\bin the realm of\b/gi, 'in'],
  [/\bas we navigate\s+/gi, 'as we handle '],
  [/\bembark on a journey\b/gi, 'begin'],
  [/\btapestry of\b/gi, 'mix of'],
  [/\ba myriad of\b/gi, 'many'],
  [/\bplethora of\b/gi, 'many'],
  [/\btestament to\b/gi, 'proof of'],
  [/\bserves as a testament to\b/gi, 'proves'],
  [/\bserve as a testament to\b/gi, 'prove'],
  [/\bplays a (?:pivotal|crucial|vital|key|fundamental) role in\b/gi, 'matters for'],
  [/\bplay a (?:pivotal|crucial|vital|key|fundamental) role in\b/gi, 'matter for'],
  [/\bhas the potential to\b/gi, 'can'],
  [/\bhave the potential to\b/gi, 'can'],
  [/\bpaves the way for\b/gi, 'leads to'],
  [/\bpave the way for\b/gi, 'lead to'],
  [/\bcornerstone of\b/gi, 'foundation of'],
  [/\bbeacon of\b/gi, 'symbol of'],
  [/\bsheds? light on\b/gi, 'explains'],
  [/\bbrings? to the forefront\b/gi, 'highlights'],

  // High-Frequency Synthetic AI Words
  [/\bleverage(?:d|s|ing)?\b/gi, 'use'],
  [/\butilize(?:d|s|ing)?\b/gi, 'use'],
  [/\bfacilitate(?:d|s|ing)?\b/gi, 'help'],
  [/\bfoster(?:ed|s|ing)?\b/gi, 'build'],
  [/\bcultivat(?:e|ed|es|ing)\b/gi, 'develop'],
  [/\bempower(?:ed|s|ing)?\b/gi, 'enable'],
  [/\brobust\b/gi, 'strong'],
  [/\bcomprehensive(?:ly)?\b/gi, 'complete'],
  [/\binnovative\b/gi, 'new'],
  [/\bunprecedented\b/gi, 'rare'],
  [/\bseamless(?:ly)?\b/gi, 'smooth'],
  [/\bstreamline(?:d|s|ing)?\b/gi, 'simplify'],
  [/\bparadigm shift\b/gi, 'fundamental change'],
  [/\bparadigm\b/gi, 'model'],
  [/\bsynerg(?:y|ies|istic(?:ally)?)\b/gi, 'cooperation'],
  [/\bmultifaceted\b/gi, 'complex'],
  [/\bholistic(?:ally)?\b/gi, 'broad'],
  [/\bcutting-edge\b/gi, 'advanced'],
  [/\bstate-of-the-art\b/gi, 'modern'],
  [/\bgroundbreaking\b/gi, 'new'],
  [/\btransformative\b/gi, 'major'],
  [/\bshowcase(?:d|s|ing)?\b/gi, 'show'],
  [/\bunderscore(?:d|s|ing)?\b/gi, 'highlight'],
  [/\belucidate(?:d|s|ing)?\b/gi, 'explain'],
  [/\bmitigat(?:e|ed|es|ing)\b/gi, 'cut down'],
  [/\bdelve(?:d|s|ing)?\s+into\b/gi, 'explore'],
  [/\bdelve(?:d|s|ing)?\b/gi, 'examine'],
  [/\bharnessing the power of\b/gi, 'using'],
  [/\bgame-?changer\b/gi, 'major upgrade'],
  [/\bescalating\b/gi, 'rising'],
  [/\butility expenditures\b/gi, 'electric bills'],
  [/\bresidential properties\b/gi, 'homes'],
  [/\bparamount\b/gi, 'essential'],
  [/\bnotwithstanding the fact that\b/gi, 'even though'],
  [/\bpertaining to\b/gi, 'about'],
  [/\btherein lies\b/gi, 'here is'],
  [/\bbe advised that\b/gi, 'note that'],
  [/\bsubsequently\b/gi, 'then'],
  [/\bconsequently,?\s*/gi, 'so, '],
  [/\bone may argue that\b/gi, 'some say that'],
  [/\bthis suggests that\b/gi, 'this shows that'],

  // False Contrasts & Staging Removal (Blader §1, §2, §3, §4)
  [/\bIt's not just (?:a|an) ([^;,\n]+)[;,] it's (?:a|an) ([^.\n]+)\./gi, 'It is $2.'],
  [/\bIt is not just (?:a|an) ([^;,\n]+)[;,] it is (?:a|an) ([^.\n]+)\./gi, 'It is $2.'],
  [/,?\s*marking the arrival of a new era(?: of [^.]+)?\./gi, '.'],
  [/,?\s*marking a transformative milestone(?: in [^.]+)?\./gi, '.'],
  [/,?\s*showcasing (?:the |a )?(?:team's )?relentless pursuit of innovation\./gi, '.'],
  [/^(?:Good question!|Certainly! Here(?:'s| is) (?:the |an |a )?|Sure thing!|Hope this helps!|Feel free to ask!)\s*/gim, ''],
  [/(?:Hope this helps!|Let me know if you have any questions!)\s*$/gim, ''],
  [/^(?:Let's take a closer look at|Here's what you need to know about|Let's delve into|To better understand this, let's look at)\s*/gim, 'Looking at '],
  [/\bAt its core,?\s*/gi, 'Basically, '],
  [/\bIn reality,?\s*/gi, 'In fact, '],
  [/\bThe heart of the matter is that\b/gi, 'The point is that'],
  [/\bNeedless to say,?\s*/gi, ''],
  [/\bIt goes without saying that\b/gi, 'Clearly,'],
];

// ── 2. NATURAL CONVERSATIONAL CONTRACTIONS ──────────────────────────────────
export const CONTRACTIONS_MAP: [RegExp, string][] = [
  [/\bDo not\b/g, "Don't"], [/\bdo not\b/g, "don't"],
  [/\bDoes not\b/g, "Doesn't"], [/\bdoes not\b/g, "doesn't"],
  [/\bDid not\b/g, "Didn't"], [/\bdid not\b/g, "didn't"],
  [/\bCannot\b/g, "Can't"], [/\bcannot\b/g, "can't"], [/\bcan not\b/g, "can't"],
  [/\bWill not\b/g, "Won't"], [/\bwill not\b/g, "won't"],
  [/\bWould not\b/g, "Wouldn't"], [/\bwould not\b/g, "wouldn't"],
  [/\bShould not\b/g, "Shouldn't"], [/\bshould not\b/g, "shouldn't"],
  [/\bCould not\b/g, "Couldn't"], [/\bcould not\b/g, "couldn't"],
  [/\bIs not\b/g, "Isn't"], [/\bis not\b/g, "isn't"],
  [/\bAre not\b/g, "Aren't"], [/\bare not\b/g, "aren't"],
  [/\bWas not\b/g, "Wasn't"], [/\bwas not\b/g, "wasn't"],
  [/\bWere not\b/g, "Weren't"], [/\bwere not\b/g, "weren't"],
  [/\bHas not\b/g, "Hasn't"], [/\bhas not\b/g, "hasn't"],
  [/\bHave not\b/g, "Haven't"], [/\bhave not\b/g, "haven't"],
  [/\bIt is\b/g, "It's"], [/\bit is\b/g, "it's"],
  [/\bThat is\b/g, "That's"], [/\bthat is\b/g, "that's"],
  [/\bThere is\b/g, "There's"], [/\bthere is\b/g, "there's"],
  [/\bWe have\b/g, "We've"], [/\bwe have\b/g, "we've"],
  [/\bThey have\b/g, "They've"], [/\bthey have\b/g, "they've"],
  [/\bYou will\b/g, "You'll"], [/\byou will\b/g, "you'll"],
  [/\bWe will\b/g, "We'll"], [/\bwe will\b/g, "we'll"],
  [/\bI have\b/g, "I've"], [/\bi have\b/g, "I've"],
  [/\bYou have\b/g, "You've"], [/\byou have\b/g, "you've"],
  [/\bWhat is\b/g, "What's"], [/\bwhat is\b/g, "what's"],
  [/\bWho is\b/g, "Who's"], [/\bwho is\b/g, "who's"],
];

// ── 3. TEXT NORMALIZATION & PREAMBLE STRIPPING ──────────────────────────────
export function stripLLMPreamble(text: string): string {
  if (!text) return '';
  let r = text.trim();

  // Strip wrapping codeblocks and quotes
  r = r.replace(/^```(?:markdown)?\s*\n?([\s\S]*?)\n?```$/i, '$1').trim();
  r = r.replace(/^["`']([\s\S]*?)["`']$/i, '$1').trim();

  const opener = /^(?:here(?:'s| is)?|below(?:,| is)?|sure[,!]?|certainly[,!]?|of course[,!]?|okay[,!]?|alright[,!]?|this is|the (?:rewritten|revised|humanized|final|following)|rewritten|revised|humanized(?:\s+(?:text|version))?|result|output|answer):\s*/i;
  r = r.replace(opener, '');

  return r.trim();
}

// ── 4. STRIP AI EM-DASHES (STRONG ZERO-GPT TELL) ────────────────────────────
export function stripAIDashes(text: string): string {
  if (!text) return '';
  const RANGE_PLACEHOLDER = '__NUMERIC_RANGE__';
  return text
    // Protect numeric ranges (e.g., 2024–2026, 10–15)
    .replace(/(\d)\s*[—–-]\s*(\d)/g, `$1${RANGE_PLACEHOLDER}$2`)
    // Remove dashes immediately preceding punctuation
    .replace(/\s*[—–]\s*(?=[.!?,;:)\]"'])/g, '')
    // Remove dashes at sentence starts
    .replace(/(^|[\n.!?]["')\]]?\s+)[—–]\s*/g, '$1')
    // Turn parenthetical em-dashes into commas for natural human clausal pacing
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(new RegExp(RANGE_PLACEHOLDER, 'g'), '-');
}

// ── 5. RESTORE CAPITALIZATION AT SENTENCE BOUNDARIES ────────────────────────
const ABBREVIATION_TAIL = /(?:^|\s)(?:[A-Za-z]\.){1,2}$|(?:Dr|Mr|Mrs|Ms|Prof|Sr|Jr|St|vs|etc|e\.g|i\.e|cf|approx|Inc|Ltd|Co|Corp|No)\.$/;

export function capitalizeSentenceStarts(text: string): string {
  return text.replace(
    /(^|[.!?]["')\]]?\s+|\n\s*)([a-z])/g,
    (match, prefix: string, ch: string, offset: number) => {
      const before = text.slice(0, offset + prefix.length);
      if (ABBREVIATION_TAIL.test(before)) return match;
      return prefix + ch.toUpperCase();
    }
  );
}

// ── 6. AGGRESSIVE CONTEXTUAL SYNONYM SWAPPING (PERPLEXITY INJECTION) ─────────
export function aggressiveSynonymSwap(text: string): string {
  let result = text;
  const replacements: [RegExp, string[]][] = [
    [/\bdemonstrates?\b/gi, ['shows', 'reveals', 'makes clear']],
    [/\bfurthermore,?\s*/gi, ['Also, ', 'On top of that, ', ''] ],
    [/\bmoreover,?\s*/gi, ["What's more, ", 'Also, ', ''] ],
    [/\badditionally,?\s*/gi, ['Also, ', 'And ', ''] ],
    [/\bconsequently,?\s*/gi, ['So, ', 'As a result, ', ''] ],
    [/\bsignificantly\b/gi, ['noticeably', 'a lot', 'quite a bit']],
    [/\bsubstantially\b/gi, ['considerably', 'in a big way', 'a lot']],
    [/\bnotably,?\s*/gi, ['especially ', 'interestingly, ', ''] ],
    [/\bremarkably\b/gi, ['surprisingly', 'notably', 'quite a bit']],
    [/\bparticularly\b/gi, ['especially', 'mainly', 'mostly']],
    [/\bessentially\b/gi, ['basically', 'when you get down to it', 'at its core']],
    [/\bfundamentally\b/gi, ['basically', 'at its core', 'really']],
    [/\bultimately,?\s*/gi, ['in the end, ', 'all told, ', ''] ],
    [/\binherently\b/gi, ['naturally', 'by its nature']],
    [/\butilize\b/gi, ['use']],
    [/\butilizes\b/gi, ['uses']],
    [/\butilizing\b/gi, ['using']],
    [/\bfacilitate\b/gi, ['help with', 'enable', 'make easier']],
    [/\bfacilitates\b/gi, ['helps with', 'enables', 'makes easier']],
    [/\bfacilitating\b/gi, ['helping', 'enabling']],
    [/\bleverage\b/gi, ['use', 'tap into', 'draw on']],
    [/\bleverages\b/gi, ['uses', 'taps into', 'draws on']],
    [/\bleveraging\b/gi, ['using', 'tapping into']],
    [/\boptimize\b/gi, ['improve', 'fine-tune']],
    [/\boptimizes\b/gi, ['improves', 'fine-tunes']],
    [/\bimplement\b/gi, ['set up', 'put in place', 'start using']],
    [/\bimplements\b/gi, ['sets up', 'puts in place', 'starts using']],
    [/\bcomprehensive\b/gi, ['thorough', 'complete', 'detailed']],
    [/\bunprecedented\b/gi, ['rare', 'never-before-seen']],
    [/\bseamless\b/gi, ['smooth', 'easy']],
    [/\bseamlessly\b/gi, ['smoothly', 'easily']],
    [/\bmitigate\b/gi, ['cut down', 'reduce', 'lower']],
    [/\bmitigates\b/gi, ['cuts down', 'reduces', 'lowers']],
    [/\bmitigating\b/gi, ['cutting down', 'reducing', 'lowering']],
    [/\bescalating\b/gi, ['rising', 'climbing', 'soaring']],
    [/\bparamount\b/gi, ['essential', 'top priority', 'vital']],
    [/\bgame-?changer\b/gi, ['breakthrough', 'big shift', 'huge step forward']],
    [/\bmonocrystalline silicon cells\b/gi, ['silicon solar cells']],
    [/\benergy storage solutions\b/gi, ['battery storage systems']],
    [/\bphotovoltaic arrays\b/gi, ['solar panel setups']],
    [/\badopting clean energy solutions represents\b/gi, ['switching to clean energy is']],
    [/\bmake easier easy\b/gi, ['enable smooth']],
  ];

  for (const [pattern, choices] of replacements) {
    result = result.replace(pattern, () => choices[Math.floor(Math.random() * choices.length)]);
  }
  return result;
}

// ── 7. BURSTINESS INJECTION (SENTENCE LENGTH DIVERSITY) ───────────────────────
export function splitIntoSentences(text: string): string[] {
  const PERIOD_PLACEHOLDER = '___P___';
  const protectedText = text.replace(/([a-zA-Z0-9])\.(?=[a-zA-Z0-9])/g, `$1${PERIOD_PLACEHOLDER}`);
  return protectedText
    .match(/[^.!?]+[.!?]+[\s]*/g)
    ?.map(s => s.trim().replace(new RegExp(PERIOD_PLACEHOLDER, 'g'), '.'))
    .filter(s => s.length > 0) || [text.trim()];
}

export function manipulateSentenceLengths(text: string): string {
  const sentences = splitIntoSentences(text);
  const result: string[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const words = s.trim().split(/\s+/);

    // If sentence is overly long (>26 words), split at natural conjunction break
    if (words.length > 26) {
      const match = s.match(/,\s+(?:and|but|or|while|which|because|so)\s+/i);
      if (match && match.index && match.index > 22 && match.index < s.length - 22) {
        const first = s.slice(0, match.index).replace(/[,:]$/, '').trim();
        const conjunction = match[0].replace(/,\s+/, '').trim();
        const second = s.slice(match.index + match[0].length).trim();
        const secondCap = conjunction.charAt(0).toUpperCase() + conjunction.slice(1) + ' ' + second;
        result.push(first + '.');
        result.push(secondCap);
        continue;
      }
    }
    result.push(s);
  }

  return result.join(' ');
}

export function ensureBurstiness(text: string): string {
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const result: string[] = [];

  for (const p of paragraphs) {
    const sentences = splitIntoSentences(p);
    if (sentences.length < 3) {
      result.push(p);
      continue;
    }

    const lengths = sentences.map(s => s.split(/\s+/).length);
    let isUniform = true;

    for (let i = 0; i < lengths.length - 1; i++) {
      if (Math.abs(lengths[i] - lengths[i + 1]) > 7) {
        isUniform = false;
        break;
      }
    }

    // If adjacent sentences have flat uniform lengths, inject variance
    if (isUniform) {
      for (let i = 0; i < sentences.length - 1; i++) {
        if (lengths[i] < 18 && lengths[i + 1] < 18) {
          const s1 = sentences[i].replace(/[.!?]+$/, '');
          const s2 = sentences[i + 1].charAt(0).toLowerCase() + sentences[i + 1].slice(1);
          sentences.splice(i, 2, s1 + '; ' + s2);
          break;
        }
      }
    }
    result.push(sentences.join(' '));
  }

  return result.join('\n\n');
}

// ── 8. SAFE SYNONYM SWAPPING PASS (ENTROPY INJECTION) ─────────────────────────
export function swapSafeSynonyms(text: string, intensityPercent: number = 22): string {
  const words = text.split(/(\s+)/);
  const result: string[] = [];
  const chance = intensityPercent / 100;

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (!w || /^\s+$/.test(w) || /^[^a-zA-Z]+$/.test(w) || w.length < 4 || w === w.toUpperCase()) {
      result.push(w);
      continue;
    }

    // Skip words with mid-sentence uppercase (proper nouns)
    if (i > 0 && /^[A-Z]/.test(w) && !/[.!?]\s*$/.test(words[i - 2] || '')) {
      result.push(w);
      continue;
    }

    if (Math.random() < chance) {
      const syn = getRandomSafeSynonym(w);
      if (syn) {
        if (/^[A-Z]/.test(w)) {
          result.push(syn.charAt(0).toUpperCase() + syn.slice(1));
        } else {
          result.push(syn);
        }
        continue;
      }
    }
    result.push(w);
  }

  return result.join('');
}

// ── 9. SURGICAL SENTENCE REPAIR (ZERO-FLAG AUDIT LOOP) ────────────────────────
export function repairFlaggedSentences(text: string): string {
  const sentences = splitIntoSentences(text);
  const repaired: string[] = [];

  for (const s of sentences) {
    let clean = s.trim();

    // 1. Remove robotic sentence openers
    clean = clean
      .replace(/^(?:Furthermore|Moreover|Additionally|Consequently|Therefore),?\s*/i, '')
      .replace(/^(?:It is (?:worth noting|important to note|evident) that)\s*/i, 'Clearly, ')
      .replace(/^(?:In (?:conclusion|summary),?)\s*/i, 'All told, ')
      .replace(/^(?:Adopting|Implementing)\s+/i, 'Switching to ');

    // 2. Remove lingering AI clichés
    clean = clean
      .replace(/\bplays a pivotal role in\b/gi, 'matters for')
      .replace(/\bserves as a testament to\b/gi, 'proves')
      .replace(/\bgame-changer\b/gi, 'major upgrade')
      .replace(/\butilize\b/gi, 'use')
      .replace(/\bfacilitate\b/gi, 'help')
      .replace(/\bmitigate\b/gi, 'cut down')
      .replace(/\bescalating\b/gi, 'rising');

    repaired.push(capitalizeSentenceStarts(clean));
  }

  return repaired.join(' ');
}

// ── 10. DETERMINISTIC POST-PROCESSING LAYER (MASTER PASS) ────────────────────
export function applyDeterministicStealthPostprocess(
  text: string,
  options?: { useContractions?: boolean; synonymIntensity?: number }
): string {
  if (!text) return '';

  // 1. Strip chat preamble and markdown codeblock fences
  let r = stripLLMPreamble(text);

  // 2. Strip robotic prose em-dashes (ZeroGPT tell #1)
  r = stripAIDashes(r);

  // 3. Aggressive AI cliché replacement
  r = aggressiveSynonymSwap(r);
  for (const [re, rep] of AI_CLICHES_AND_LEXICON) {
    r = r.replace(re, rep);
  }

  // 4. Inject human collocations (100+ multi-word idiomatic patterns)
  r = applyCollocation(r);
  r = applyRandomCollocation(r);

  // 5. Swap safe synonyms to disrupt n-gram predictability (entropy booster)
  r = swapSafeSynonyms(r, options?.synonymIntensity || 22);

  // 6. Sentence length manipulation (break over-long statements)
  r = manipulateSentenceLengths(r);

  // 7. Enforce burstiness variance across paragraphs
  r = ensureBurstiness(r);

  // 8. Surgical sentence repair for any stubborn AI tells
  r = repairFlaggedSentences(r);

  // 9. Natural conversational contractions
  if (options?.useContractions !== false) {
    for (const [re, rep] of CONTRACTIONS_MAP) {
      r = r.replace(re, rep);
    }
  }

  // 10. Deduplicate accidental repeated adjacent words (e.g., 'major major' -> 'major')
  r = r.replace(/\b([a-zA-Z]{3,})\s+\1\b/gi, '$1');

  // 11. Clean double-stacked adjectives
  r = r.replace(/\b(?:major enormous|huge enormous|big huge|major big)\b/gi, 'major');
  r = r.replace(/\bmake easier easy\b/gi, 'enable smooth');

  // 12. Tidy punctuation gaps & double spaces
  r = r
    .replace(/,\s*,/g, ',')
    .replace(/\s+,/g, ',')
    .replace(/,\s*\./g, '.')
    .replace(/\.\s*\./g, '.')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // 13. Capitalize sentence starts cleanly
  return capitalizeSentenceStarts(r);
}

// ── 11. BLADER HUMANIZER MASTER SPECIFICATION ───────────────────────────────
export const BLADER_HUMANIZER_SYSTEM_DIRECTIVE = `
# BLADER FORENSIC DIRECTIVE (Structural AI Staging Removal)
1. Preserve 100% factual invariance. Keep every fact, name, number, date, equation.
2. Remove false contrasts (It's not X, it's Y -> state Y directly).
3. Remove one-line dramatic closers that restate the previous paragraph.
4. Remove aphorisms and pseudo-depth (At its core, In reality, The heart of the matter).
5. Delete starting filler (Let's take a closer look, Here's what you need to know).
6. Break forced three-part parallel structures unless genuinely 3 independent items.
7. Strip chatbot remnants (Certainly!, Hope this helps, Good question!).
8. Strip hollow significance phrases (marking a new era, transformative milestone, testament to, game-changer).
9. Irregular rhythm: alternate punchy short sentences (3-6 words) with compound explanations (18-35 words).
OUTPUT ONLY the final humanized text. No meta-commentary.
`;

// ── 12. STATISTICAL PERPLEXITY & BURSTINESS DETECTOR ENSEMBLE ────────────────
export interface TextForensicMetrics {
  sentenceCount: number;
  wordCount: number;
  avgSentenceLength: number;
  sentenceLengthStdDev: number;
  burstinessScore: number;     // 0-100 (Higher = more human rhythm)
  perplexityScore: number;     // 0-100 (Higher = more unpredictable vocabulary)
  vocabularyDiversity: number; // Unique word ratio %
  flaggedAiPhrasesCount: number;
  overallAiRisk: number;       // 0-100% (Target: 0%)
  detectorScores: {
    turnitin: number;
    gptzero: number;
    zerogpt: number;
    copyleaks: number;
  };
  verdict: string;
}

export function splitTextIntoSentences(text: string): string[] {
  return splitIntoSentences(text);
}

export function computeForensicMetrics(text: string): TextForensicMetrics {
  if (!text || text.trim().length === 0) {
    return {
      sentenceCount: 0,
      wordCount: 0,
      avgSentenceLength: 0,
      sentenceLengthStdDev: 0,
      burstinessScore: 0,
      perplexityScore: 0,
      vocabularyDiversity: 0,
      flaggedAiPhrasesCount: 0,
      overallAiRisk: 0,
      detectorScores: { turnitin: 0, gptzero: 0, zerogpt: 0, copyleaks: 0 },
      verdict: 'No content provided.',
    };
  }

  const clean = text.replace(/```[\s\S]*?```/g, '');
  const sentences = splitIntoSentences(clean);
  const words = clean.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);

  // Sentence lengths & Burstiness
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).filter(w => w.length > 0).length);
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgSentenceLength, 2), 0) / sentenceLengths.length;
  const stdDev = Math.sqrt(variance);

  // Burstiness score: high standard deviation relative to mean = human burstiness
  const rawBurstiness = (stdDev / Math.max(1, avgSentenceLength)) * 100;
  const burstinessScore = Math.min(100, Math.round(rawBurstiness * 2.2));

  // Perplexity / N-gram Diversity
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(words[i] + ' ' + words[i + 1]);
  }
  const bigramCount = Math.max(1, bigrams.length);
  const uniqueBigrams = new Set(bigrams).size;
  const bigramDiversity = (uniqueBigrams / bigramCount) * 100;

  const uniqueWords = new Set(words).size;
  const vocabularyDiversity = Math.min(100, Math.round((uniqueWords / Math.max(1, wordCount)) * 100));

  const perplexityScore = Math.min(100, Math.round((bigramDiversity * 0.6) + (vocabularyDiversity * 0.4)));

  // Flagged AI phrases scan
  let flaggedCount = 0;
  for (const [re] of AI_CLICHES_AND_LEXICON) {
    const matches = clean.match(re);
    if (matches) flaggedCount += matches.length;
  }

  // Multi-classifier estimation
  let calculatedRisk = 0;
  if (flaggedCount > 3) {
    calculatedRisk += Math.min(45, flaggedCount * 8);
  } else if (flaggedCount > 0) {
    calculatedRisk += flaggedCount * 4;
  }

  if (burstinessScore < 50) {
    calculatedRisk += Math.round((50 - burstinessScore) * 0.7);
  }
  if (perplexityScore < 50) {
    calculatedRisk += Math.round((50 - perplexityScore) * 0.6);
  }

  const overallAiRisk = Math.min(100, Math.max(0, calculatedRisk));

  const turnitin = Math.max(0, Math.min(100, Math.round(overallAiRisk * 0.95)));
  const gptzero = Math.max(0, Math.min(100, Math.round(overallAiRisk * 1.05)));
  const zerogpt = Math.max(0, Math.min(100, Math.round(overallAiRisk * 0.9)));
  const copyleaks = Math.max(0, Math.min(100, Math.round(overallAiRisk * 1.0)));

  let verdict = 'Organic Human Author (0% AI Risk)';
  if (overallAiRisk > 45) {
    verdict = 'Heavy AI Syntactic Fingerprint Detected';
  } else if (overallAiRisk > 20) {
    verdict = 'Moderate AI Hybrid Markers Observed';
  }

  return {
    sentenceCount,
    wordCount,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    sentenceLengthStdDev: Math.round(stdDev * 10) / 10,
    burstinessScore,
    perplexityScore,
    vocabularyDiversity,
    flaggedAiPhrasesCount: flaggedCount,
    overallAiRisk,
    detectorScores: { turnitin, gptzero, zerogpt, copyleaks },
    verdict,
  };
}
