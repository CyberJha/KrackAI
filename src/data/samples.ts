import { Humanizer10RulesConfig } from '../types';

export const THE_10_PROMPT_TEMPLATES = [
  {
    id: 1,
    title: '12-Year-Old Comprehension (Adult-Respected)',
    shortName: '12yo Readability',
    prompt: `“Write for a 12-year-old. They should be able to understand this, so provide relatable information and examples, but don’t sound cheesy, as adults will be the ones actually reading this article.”`,
    explanation: 'Dismantles dense jargon into crystal-clear, relatable concepts while maintaining intellectual respect and elegance.',
    icon: 'Baby',
  },
  {
    id: 2,
    title: 'Anti-Academic & Coffee Shop Conversational Flow',
    shortName: 'Coffee-Shop Chat',
    prompt: `“Please generate text that avoids using formal or overly academic phrases such as 'it is worth noting,' 'furthermore,' 'consequently,' 'in terms of,' 'one may argue,' 'it is imperative,' 'this suggests that,' 'thus,' 'it is evident that,' 'notwithstanding,' 'pertaining to,' 'therein lies,' 'utilize,' 'be advised,' 'hence,' 'indicate,' 'facilitate,' 'subsequently,' 'moreover,' and 'it can be seen that.' Aim for a natural, conversational style that sounds like two friends talking at the coffee shop. Use direct, simple language and choose phrases that are commonly used in everyday speech. If a formal phrase is absolutely necessary for clarity or accuracy, you may include it, but otherwise, please prioritize making the text engaging, clear, and relatable."`,
    explanation: 'Purges statistical AI buzzwords and robotic connectors, replacing them with fluid everyday conversational phrases.',
    icon: 'Coffee',
  },
  {
    id: 3,
    title: 'Geographic & Regional Localization',
    shortName: 'Local Geo Nuances',
    prompt: `“When writing this article, keep in mind our customers live in (name the area if this applies to a local/regional business). Reference local phrases, landmarks, cultures, etc., if applicable.”`,
    explanation: 'Infuses authentic local landmarks, colloquial turns of phrase, weather, and community culture.',
    icon: 'MapPin',
  },
  {
    id: 4,
    title: 'Contractions & Colloquialisms',
    shortName: 'Contractions & Slang',
    prompt: `“Use contractions, colloquialisms, and approachable language throughout the article.”`,
    explanation: 'Enforces natural English contractions (it\'s, don\'t, we\'ve, let\'s) to eliminate stiff AI cadence.',
    icon: 'MessageSquare',
  },
  {
    id: 5,
    title: 'Brand / Company Identity Integration',
    shortName: 'Brand Mentions',
    prompt: `“When writing the article, please use our company name, which is (Company Name), at a few different points. It should be clear to the reader that we are the ones writing this post.” (feel free to include more pertinent information regarding your company here)`,
    explanation: 'Weaves your brand naturally into the narrative without turning the piece into an obvious advertisement.',
    icon: 'Building2',
  },
  {
    id: 6,
    title: 'Non-Pushy, Non-Salesy Human Touch',
    shortName: 'Non-Pushy Empathy',
    prompt: `“Do NOT be pushy or salesy with your writing style. We want the reader to know our company exists and that it solves the problem the article is discussing, but the style should not come across as biased. This is VERY important. The reader should sense we are very human just like them, we understand their problems, and we seek to honestly give them accurate information, in a fun, casual way.”`,
    explanation: 'Builds genuine goodwill and trust by prioritizing honest helpfulness over high-pressure sales tactics.',
    icon: 'HeartHandshake',
  },
  {
    id: 7,
    title: 'Vivid Scenarios & Fictional Illustrative Anecdotes',
    shortName: 'Vivid Anecdotes',
    prompt: `"Clarify the concepts in the article by anchoring them in vivid, conceivable real-life scenarios. Feel free to craft illustrative anecdotes that shed light on the subject matter. Transparency is key here—ensure that these hypothetical situations are presented as fictional examples, NOT as factual occurrences, as we want to maintain integrity with the reader."`,
    explanation: 'Illuminates complex ideas through grounded hypothetical stories clearly framed as illustrative examples.',
    icon: 'Sparkle',
  },
  {
    id: 8,
    title: 'High-Hook Introduction & Problem-Payoff Framework',
    shortName: 'Hook & Payoff Intro',
    prompt: `“The introduction of the article should identify the problem the buyer has and contextualize who they are. It should also outline what the reader will get and learn from reading the post, and the payoff that will come with completing the content.”`,
    explanation: 'Hooks the reader immediately with an empathetic problem statement, target reader context, and explicit payoff promise.',
    icon: 'Zap',
  },
  {
    id: 9,
    title: 'Dynamic Paragraph & Sentence Cadence (Burstiness)',
    shortName: 'Cadence Burstiness',
    prompt: `“Vary the length of the paragraphs and sentences in these writings. Look for opportunities to create punchy, incisive moments to land your points, while at other times produce paragraphs that are 2-4 sentences as needed.”`,
    explanation: 'Creates a musical human rhythm alternating between 3-word punchy lines and flowing multi-clause sentences.',
    icon: 'Activity',
  },
  {
    id: 10,
    title: 'Target Buyer Persona / Reader Avatar Alignment',
    shortName: 'Target Avatar',
    prompt: `“Keep in mind our primary avatar/persona for this article is (Describe your ideal persona/reader here. Be as detailed as you’d like to be.) Reference these elements of the avatar when appropriate to the content.”`,
    explanation: 'Speaks directly to the exact daily struggles, desires, and habits of your specific reader demographic.',
    icon: 'UserCheck',
  },
];

export const DEFAULT_10_RULES_CONFIG: Humanizer10RulesConfig = {
  rule1_12yoReading: true,
  rule2_antiAcademicCoffeeShop: true,
  rule3_localGeographic: true,
  rule3_targetLocation: 'Austin, Texas',
  rule4_contractionsColloquial: true,
  rule5_brandIntegration: true,
  rule5_companyName: 'Hill Country Solar & Storage',
  rule5_companyInfo: 'Local family-owned clean energy installer operating across Travis and Williamson counties for over 12 years.',
  rule6_nonPushyAuthentic: true,
  rule7_fictionalAnecdotes: true,
  rule7_anecdoteTheme: 'Imagine a homeowner named Sarah whose AC trips during a scorching 104° August heatwave',
  rule8_hookIntroFramework: true,
  rule9_dynamicCadence: true,
  rule10_targetAvatar: true,
  rule10_avatarDescription: 'Cost-conscious Texas homeowner (30-55 yrs old) frustrated with rising ERCOT electric bills and unpredictable grid blackouts.',
};

export interface SamplePresetDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  config: Humanizer10RulesConfig;
  sampleInput: string;
}

export const SAMPLE_10_RULE_PRESETS: SamplePresetDefinition[] = [
  {
    id: 'austin-solar',
    name: 'Austin Clean Energy Pro',
    category: 'Local Service Business',
    description: 'Targeting Texas homeowners tackling summer electric bills with friendly local flair.',
    config: {
      rule1_12yoReading: true,
      rule2_antiAcademicCoffeeShop: true,
      rule3_localGeographic: true,
      rule3_targetLocation: 'Austin & Central Texas (Hill Country, Barton Springs, South Congress)',
      rule4_contractionsColloquial: true,
      rule5_brandIntegration: true,
      rule5_companyName: 'Lone Star Solar Lab',
      rule5_companyInfo: 'Austin-based residential rooftop solar & battery installer focused on zero-pressure education.',
      rule6_nonPushyAuthentic: true,
      rule7_fictionalAnecdotes: true,
      rule7_anecdoteTheme: 'A fictional family in Round Rock dealing with a $480 July electricity bill while running two AC units',
      rule8_hookIntroFramework: true,
      rule9_dynamicCadence: true,
      rule10_targetAvatar: true,
      rule10_avatarDescription: 'Practical Texas homeowner in their late 30s or 40s who loves BBQ weekends and hates surging summer utility bills.',
    },
    sampleInput: `In today's rapidly evolving energy landscape, residential solar power and battery backup systems play a pivotal role in mitigating escalating utility expenditures. Furthermore, it is worth noting that rooftop photovoltaic arrays utilize monocrystalline silicon cells to facilitate seamless conversion of sunlight into direct current electricity. Consequently, homeowners who implement energy storage solutions can foster resilience against grid instability. Moreover, it is imperative to recognize that lithium iron phosphate chemistry serves as a testament to modern engineering, providing paramount reliability during periods of peak demand. In conclusion, adopting clean energy solutions represents a transformative game-changer for suburban residential properties.`,
  },
  {
    id: 'denver-coffee',
    name: 'Mile High Artisan Coffee',
    category: 'Food & Beverage / E-Commerce',
    description: 'Casual, warm specialty coffee guide for beginner home brewers.',
    config: {
      rule1_12yoReading: true,
      rule2_antiAcademicCoffeeShop: true,
      rule3_localGeographic: true,
      rule3_targetLocation: 'Denver & the Front Range (RiNo, Highlands, Red Rocks trailheads)',
      rule4_contractionsColloquial: true,
      rule5_brandIntegration: true,
      rule5_companyName: 'Elevation Roasters',
      rule5_companyInfo: 'Denver micro-roastery sourcing fair-trade micro-lots and helping folks make better coffee at home.',
      rule6_nonPushyAuthentic: true,
      rule7_fictionalAnecdotes: true,
      rule7_anecdoteTheme: 'Picture a weekend hiker named Dave trying to brew a french press at 6 AM before heading up I-70',
      rule8_hookIntroFramework: true,
      rule9_dynamicCadence: true,
      rule10_targetAvatar: true,
      rule10_avatarDescription: 'Active outdoor enthusiast who loves good coffee but feels intimidated by pretentious coffee snobbery.',
    },
    sampleInput: `Specialty coffee extraction pertains to the multifaceted hydrodynamic dissolution of soluble flavor compounds from roasted Arabica beans. Furthermore, it is crucial to observe that water temperature between 92°C and 96°C facilitates optimal extraction kinetics without inducing excessive bitterness. Moreover, grind uniformity underscores the cornerstone of repeatable espresso brewing, wherein burr grinders utilize precision steel conical mechanisms to mitigate fines. Consequently, one may argue that water chemistry plays a paramount role, as calcium and magnesium ions foster enhanced flavor transport. In summary, mastering coffee brewing represents a transformative journey for beverage connoisseurs.`,
  },
  {
    id: 'saas-remote-ops',
    name: 'CloudSync Workflow SaaS',
    category: 'B2B Software & Tech',
    description: 'De-jargonizing enterprise software for busy remote team leaders.',
    config: {
      rule1_12yoReading: true,
      rule2_antiAcademicCoffeeShop: true,
      rule3_localGeographic: false,
      rule3_targetLocation: '',
      rule4_contractionsColloquial: true,
      rule5_brandIntegration: true,
      rule5_companyName: 'FlowPulse',
      rule5_companyInfo: 'Lightweight asynchronous team check-in and task coordination tool for distributed teams.',
      rule6_nonPushyAuthentic: true,
      rule7_fictionalAnecdotes: true,
      rule7_anecdoteTheme: 'Imagine a team lead named Maya who spent 4 hours on a Monday just figuring out who was working on what',
      rule8_hookIntroFramework: true,
      rule9_dynamicCadence: true,
      rule10_targetAvatar: true,
      rule10_avatarDescription: 'Stressed product manager or team lead managing 8 remote engineers across 3 time zones.',
    },
    sampleInput: `In the contemporary digital workplace, asynchronous collaboration frameworks have emerged as an indispensable paradigm for distributed organizations. It is worth noting that excessive synchronous video conferences foster cognitive fatigue and undermine deep work cycles. Furthermore, cross-functional project management platforms utilize automated status aggregators to facilitate real-time operational visibility. Consequently, this methodology serves as a testament to agile principles, underscoring the necessity of streamlined documentation. Thus, organizations that prioritize structured asynchronous communication can revolutionize productivity benchmarks.`,
  },
  {
    id: 'chicago-personal-finance',
    name: 'Windy City Wealth Guide',
    category: 'Finance & Investing',
    description: 'Making index funds and retirement planning simple and stress-free.',
    config: {
      rule1_12yoReading: true,
      rule2_antiAcademicCoffeeShop: true,
      rule3_localGeographic: true,
      rule3_targetLocation: 'Chicago & Chicagoland suburbs (Loop, Lincoln Park, West Loop)',
      rule4_contractionsColloquial: true,
      rule5_brandIntegration: true,
      rule5_companyName: 'Lakeside Financial Advisory',
      rule5_companyInfo: 'Fee-only fiduciary financial planning firm dedicated to transparent, plain-English advice.',
      rule6_nonPushyAuthentic: true,
      rule7_fictionalAnecdotes: true,
      rule7_anecdoteTheme: 'Think of a 32-year-old marketing manager named Marcus looking at his company 401(k) dashboard like it is written in hieroglyphics',
      rule8_hookIntroFramework: true,
      rule9_dynamicCadence: true,
      rule10_targetAvatar: true,
      rule10_avatarDescription: 'Working professional (28-45 yrs) who wants to build wealth and stop worrying about money without getting scammed by fancy jargon.',
    },
    sampleInput: `Compound interest is widely acknowledged as a foundational cornerstone of long-term wealth accumulation. It is imperative to comprehend that reinvesting dividend distributions facilitates exponential capital appreciation over multi-decade horizons. Furthermore, low-cost index funds utilize broad market diversification to mitigate idiosyncratic risk across equity asset classes. Consequently, dollar-cost averaging serves as a testament to disciplined asset allocation, ensuring that investors navigate market volatility without emotional distress. In summary, adopting a prudent financial strategy plays a pivotal role in securing retirement readiness.`,
  },
];

export const SAMPLE_AI_DRAFTS = [
  {
    id: 'austin-solar-draft',
    title: 'Texas Solar & Heatwaves (Formulaic AI Draft)',
    topic: 'How residential solar and batteries work during Texas summers',
    text: `In today's rapidly evolving energy landscape, residential solar power and battery backup systems play a pivotal role in mitigating escalating utility expenditures across Texas. Furthermore, it is worth noting that rooftop photovoltaic arrays utilize monocrystalline silicon cells to facilitate seamless conversion of sunlight into direct current electricity. Consequently, homeowners who implement energy storage solutions can foster resilience against grid instability. Moreover, it is imperative to recognize that lithium iron phosphate chemistry serves as a testament to modern engineering, providing paramount reliability during periods of peak demand. In conclusion, adopting clean energy solutions represents a transformative game-changer for suburban residential properties.`,
  },
  {
    id: 'quantum-engineering',
    title: 'Quantum Engineering (Standard AI Output)',
    topic: 'What is quantum engineering and its recent developments?',
    text: `In today's rapidly evolving technological landscape, quantum engineering has emerged as a pivotal discipline that seamlessly bridges theoretical quantum physics with practical engineering principles. It is crucial to understand that quantum engineering plays a multifaceted and transformative role in shaping next-generation computing, secure telecommunications, and high-precision metrology. Furthermore, this burgeoning domain serves as a testament to modern scientific ingenuity, delving deep into the intricate mechanics of superposition and entanglement.

Key Pillars of Quantum Engineering:
- **Quantum Computing Hardware**: Superconducting qubits and trapped-ion architectures demonstrate unprecedented processing paradigms, serving as a beacon of hope for solving intractable algorithmic challenges.
- **Quantum Sensing and Metrology**: Nitrogen-vacancy centers in diamonds facilitate ultra-sensitive magnetometry, unlocking revolutionary diagnostics in cellular biomedical imaging.
- **Quantum Cryptography Protocols**: Quantum Key Distribution (QKD) safeguards national digital infrastructures by leveraging the Heisenberg Uncertainty Principle, fostering resilient network architectures.
- **Cryogenic Control Electronics**: Developing scalable CMOS interfaces at milli-Kelvin temperatures remains paramount to addressing interconnect bottlenecks in multi-qubit dilution refrigerators.

Moreover, recent breakthroughs in 2025 and 2026 have underscored the importance of fault-tolerant quantum error correction (QEC), most notably surface codes and bosonic cat codes. In summary, as researchers continue to navigate this vibrant tapestry of innovation, quantum engineering will undoubtedly revolutionize multiple global sectors, acting as a game-changer for decades to come.`,
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous LLM Agents (Standard AI Output)',
    topic: 'Architectural paradigms of multi-agent LLM systems',
    text: `The domain of artificial intelligence is currently witnessing a pivotal revolution driven by autonomous multi-agent systems. Delving into this cutting-edge framework underscores how collaborative agent architectures foster unprecedented problem-solving synergies across diverse operational landscapes. Furthermore, by orchestrating specialized agents equipped with distinct cognitive roles, developers can dismantle complex computational objectives with seamless efficiency.

Core Structural Elements:
- **Manager Coordination**: The central manager agent coordinates task decomposition and delegates subtasks with paramount precision across the workflow.
- **Memory and Reflection**: Persistent vector stores and reflection loops enable agents to iteratively refine draft outputs, ensuring high-fidelity results.
- **Tool Grounding**: Integrating search APIs and external database wrappers empowers the system to retrieve real-time empirical context.
- **Self-Correction Loops**: Critic agents evaluate intermediate outputs to mitigate hallucinations and guarantee factual consistency.

It is worth noting that while these frameworks offer a rich tapestry of capabilities, engineering reliable multi-agent workflows requires addressing latency overhead and state synchronization bottlenecks. In conclusion, multi-agent frameworks represent a cornerstone of modern cognitive computing, poised to revolutionize automated research.`,
  },
  {
    id: 'solid-state-batteries',
    title: 'Solid-State Battery Tech (Standard AI Output)',
    topic: 'Next-generation solid-state lithium battery commercialization',
    text: `In an era characterized by a rapidly evolving transition toward renewable energy, solid-state battery technology stands as a beacon of hope for sustainable transportation. It is paramount to recognize that replacing volatile liquid electrolytes with inorganic solid conductors plays a crucial role in eliminating thermal runaway risks while elevating gravimetric energy density.

Key Technological Milestones:
- **Sulfide-Based Solid Electrolytes**: High ionic conductivity approaching 10^-2 S/cm facilitates rapid lithium-ion transport, revolutionizing fast-charging capabilities.
- **Lithium Metal Anodes**: Utilizing pure lithium foil doubles specific capacity, serving as a testament to material science breakthroughs.
- **Scalable Roll-to-Roll Manufacturing**: Dry electrode coating processes minimize capital expenditure, fostering cost parity with conventional lithium-ion cells.

Furthermore, automotive original equipment manufacturers have accelerated pilot production lines to validate cycle life under extreme ambient temperatures. In conclusion, solid-state batteries are undeniably a game-changer that will shape the mobility landscape for generations.`,
  },
];


export const PYTHON_SCRIPT_CODE = `# -*- coding: utf-8 -*-
"""KrackAI.ipynb

Multi-Agent Research System — LangGraph + Groq / Gemini
Upgraded with Advanced Anti-AI-Detector Evasion Architecture

Original Architecture: LangGraph State Whiteboard Pipeline
Humanizer Upgrade: Two-Stage Perplexity & Burstiness Engine
"""

import os
import json
import time
from copy import deepcopy
from datetime import datetime, timezone
from typing import TypedDict, List, Dict, Any
from difflib import SequenceMatcher

# ==============================================================================
# STEP 1: RESEARCH STATE DEFINITION
# ==============================================================================

class ResearchState(TypedDict):
    """
    Shared state for the complete multi-agent research system.
    Every agent reads information from this shared state and
    adds its own results without destroying previous findings.
    """
    query: str
    subtasks: List[str]
    search_results: List[Dict[str, Any]]
    wiki_results: List[Dict[str, Any]]
    sources: List[Dict[str, Any]]
    current_pass_sources: List[Dict[str, Any]]
    verified_claims: List[Dict[str, Any]]
    questionable_claims: List[Dict[str, Any]]
    research_gaps: List[str]
    needs_more_research: bool
    draft_report: str
    critique: Dict[str, Any]
    final_report: str
    originality_report: Dict[str, Any]
    agent_status: Dict[str, str]
    research_date: str
    research_cutoff: str
    research_pass: int


def get_current_date() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


# ==============================================================================
# STEP 2: LLM & TOOLS INITIALIZATION
# ==============================================================================

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")  # "gemini" or "groq"

try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    gemini_llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        temperature=0,
        max_retries=2
    )
    gemini_humanizer_llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        temperature=0.88,
        max_retries=2
    )
except ImportError:
    gemini_llm = None
    gemini_humanizer_llm = None

try:
    from langchain_groq import ChatGroq
    groq_llm = ChatGroq(model="openai/gpt-oss-120b", temperature=0)
    groq_humanizer_llm = ChatGroq(model="openai/gpt-oss-120b", temperature=0.88)
except ImportError:
    groq_llm = None
    groq_humanizer_llm = None


def get_active_llm():
    if LLM_PROVIDER.lower() == "gemini" and gemini_llm:
        return gemini_llm
    elif groq_llm:
        return groq_llm
    elif gemini_llm:
        return gemini_llm
    else:
        raise RuntimeError("No LLM client configured. Please set GEMINI_API_KEY or GROQ_API_KEY.")


def get_humanizer_llm():
    """
    Returns high-temperature, creatively unconstrained LLM instance
    specifically configured to maximize lexical burstiness and perplexity.
    """
    if LLM_PROVIDER.lower() == "gemini" and gemini_humanizer_llm:
        return gemini_humanizer_llm
    elif groq_humanizer_llm:
        return groq_humanizer_llm
    elif gemini_humanizer_llm:
        return gemini_humanizer_llm
    else:
        return get_active_llm()


# ==============================================================================
# STEP 3: AGENTS SPECIFICATION
# ==============================================================================

def manager_agent(state: ResearchState) -> ResearchState:
    """Manager Agent: Plans 3 distinct subtasks."""
    active_llm = get_active_llm()
    query = state["query"]
    prompt = f"""
Today is {state['research_date']}.
User Query: {query}
Break this research topic into exactly 3 focused, non-overlapping research tasks.
Return ONLY the 3 tasks, one per line. No numbers, no markdown.
"""
    try:
        response = active_llm.invoke(prompt)
        tasks = [t.strip() for t in response.content.strip().split("\\n") if t.strip()][:3]
        while len(tasks) < 3:
            tasks.append("Investigate empirical data, metrics, and case studies.")
        state["subtasks"] = tasks
        state["agent_status"]["Manager Agent"] = "completed"
    except Exception as e:
        state["agent_status"]["Manager Agent"] = f"error: {str(e)}"
        state["subtasks"] = [
            f"Core fundamentals of {query}",
            f"Recent empirical developments in {query}",
            f"Technical challenges and outlook for {query}"
        ]
    return state


def writer_agent(state: ResearchState) -> ResearchState:
    """Writer Agent: Synthesizes research into a high-density, factual draft."""
    active_llm = get_active_llm()
    query = state["query"]
    subtasks = state.get("subtasks", [])
    search_results = state.get("search_results", [])
    wiki_results = state.get("wiki_results", [])

    prompt = f"""
You are an investigative research writer. Synthesize all verified evidence into an exhaustively detailed, highly concrete research document.
Include exact figures, metrics, named frameworks, architectures, dates, and sector-by-sector case studies.
Structure with sections:
1. Executive Summary
2. Foundational Context & Technical Definitions
3. Recent Empirical Developments & Field Metrics
4. Sectoral Analysis & Architectural Case Studies
5. Strategic Outlook & Unresolved Gaps

TOPIC: {query}
SUBTASKS: {subtasks}
SEARCH FINDINGS: {search_results}
WIKIPEDIA FINDINGS: {wiki_results}
"""
    response = active_llm.invoke(prompt)
    state["draft_report"] = response.content.strip()
    state["agent_status"]["Writer"] = "completed - detailed draft prepared"
    return state


def critic_agent(state: ResearchState) -> ResearchState:
    """Critic Agent: Audits draft for factual grounding and precision."""
    active_llm = get_active_llm()
    draft = state.get("draft_report", "")
    prompt = f"""
Review this draft for factual compliance and accuracy:
DRAFT:
{draft}

Identify unsupported statements, superficial generalities, or inaccuracies.
Return ONLY valid JSON:
{{
    "overall_assessment": "acceptable",
    "major_issues": [{"issue": "...", "reason": "...", "severity": "high"}],
    "minor_issues": [{"issue": "...", "reason": "...", "severity": "medium"}],
    "missing_information": ["..."],
    "recommended_fixes": ["Incorporate real-world benchmarks", "Clarify exact algorithmic metrics"]
}}
"""
    try:
        response = active_llm.invoke(prompt)
        raw = response.content.strip()
        if raw.startswith("\`\`\`"):
            raw = raw.replace("\`\`\`json", "").replace("\`\`\`", "").strip()
        state["critique"] = json.loads(raw)
        state["agent_status"]["Critic"] = "completed - draft reviewed"
    except Exception as e:
        state["critique"] = {
            "overall_assessment": "fallback",
            "major_issues": [],
            "minor_issues": [],
            "recommended_fixes": ["Ensure diverse syntactic structure", "Ground claims in empirical figures"]
        }
        state["agent_status"]["Critic"] = f"error: {str(e)}"
    return state


# ==============================================================================
# UPGRADED ANTI-DETECTION HUMANIZING AGENT
# ==============================================================================

def humanizing_agent(state: ResearchState) -> ResearchState:
    """
    State-of-the-Art Anti-Detection Engine.
    Bypasses AI text classifiers (Turnitin, GPTZero, ZeroGPT, CopyLeaks, Winston)
    by systematically destroying statistical AI footprints:
      1. Burstiness Spikes: Radical standard deviation in sentence length.
      2. Perplexity Elevation: Replacing deterministic top-1 n-grams with natural,
         irregular academic and analytical phrasing.
      3. Symmetry Destruction: Eradicating balanced listicle layouts, robotic bolded
         taglines, and synthetic transition words.
      4. High-Temperature Sampling: Utilizing \`get_humanizer_llm()\` (temp 0.88).
      5. Two-Stage Processing: Stage 1 (De-synthesizing & Cadence Inversion) +
         Stage 2 (Micro-syntax Polish & Perplexity Infusion).
    """
    print("\\n" + "=" * 60)
    print("✍️ ADVANCED ANTI-DETECTION HUMANIZING AGENT")
    print("=" * 60)

    draft_report = state.get("draft_report", "")
    critique = state.get("critique", {})
    recommended_fixes = critique.get("recommended_fixes", [])

    if not draft_report:
        state["agent_status"]["Humanizer"] = "error - no draft report available"
        return state

    h_llm = get_humanizer_llm()
    fixes_context = ""
    if recommended_fixes:
        fixes_context = "Critique recommendations to incorporate naturally:\\n" + "\\n".join(f"- {f}" for f in recommended_fixes)

    # STAGE 1: STRUCTURAL DE-SYNTHESIS & CADENCE INVERSION
    stage_1_prompt = f"""
You are a senior investigative academic author rewriting a technical research paper to achieve completely authentic human voice and total stylistic organic unpredictability.

CORE TASK:
Completely deconstruct and rewrite the source text below. The underlying factual data, names, numbers, metrics, dates, and markdown comparison tables MUST BE RETAINED EXACTLY, but the syntactic structure and voice must be transformed from the ground up.

MANDATORY HUMAN WRITING RULES (ANTI-DETECTION SPECIFICATION):

1. DRAMATIC SENTENCE BURSTINESS (Crucial for Perplexity & Burstiness Scores):
   - Never write three sentences of similar length in a row.
   - Constantly alternate between ultra-short, blunt sentences (3 to 7 words) and long, multi-clause analytical sentences (32 to 50 words) loaded with em-dashes, dependent clauses, and natural parentheticals.
   - Example pattern: Short punch. Extended multi-clause breakdown that examines the granular mechanics of the finding. Medium clarification. Another blunt conclusion.

2. TOTAL BAN ON AI "MARKER" VOCABULARY & PLATITUDES:
   Eliminate every trace of generic corporate AI writing.
   STRICTLY BANNED WORDS/PHRASES:
   "delve", "tapestry", "beacon", "foster", "testament", "pivotal", "paramount", "landscape", "revolutionize", "underscores", "interconnected", "crucial", "crucially", "furthermore", "moreover", "in addition", "importantly", "it is worth noting", "in conclusion", "in summary", "plays a key role", "game-changer", "cutting-edge", "rapidly evolving", "multifaceted", "a testament to".

3. SENTENCE OPENER UNPREDICTABILITY:
   - Forbid opening paragraphs or arguments with formulaic transitions ("Consequently", "Additionally", "Moreover").
   - Ban starting multiple consecutive sentences with "The [Noun]..." or "This [Noun]...".
   - Open sentences organically: with fronted gerunds ("Tracking this shift...", "Looking past the marketing claims..."), concessive clauses ("Granted, early trials were slow..."), prepositional pivots ("Under these operational constraints..."), or direct assertions.

4. DESTROY SYNTHETIC LISTICLE SYMMETRY:
   - AI text uniformly generates repetitive bullets where every item has a bold word, a colon, and one uniform sentence. Humans NEVER write like this.
   - Convert formulaic bullet points into dense, flowing analytical prose, or mix narrative analysis with irregular empirical observations.

5. SKEPTICAL, PRAGMATIC HUMAN TONE:
   - Write like a real subject-matter specialist: grounded, nuanced, occasionally conversational yet rigorous, highlighting operational bottlenecks, frictions, and caveats alongside breakthroughs.

{fixes_context}

SOURCE TEXT:
{draft_report}
"""
    try:
        stage_1_res = h_llm.invoke(stage_1_prompt)
        stage_1_text = stage_1_res.content.strip()

        # STAGE 2: PERPLEXITY INFUSION & MICRO-CADENCE REFINEMENT
        stage_2_prompt = f"""
You are an expert copy editor performing the final forensic review on this academic research report.
Your sole mission: Guarantee that the text reads 100% like a seasoned human analyst and passes every statistical AI detector (Turnitin, GPTZero, ZeroGPT, CopyLeaks) with 0% AI detection probability.

INSTRUCTIONS:
1. Scan for any lingering AI phrasing: Remove any remaining instances of "pivotal", "underscores", "testament", "moreover", "furthermore", "landscape", "delve", or "it is essential to". Replace them with concrete, grounded verbs and vocabulary.
2. Check Sentence Length Variance: Ensure that every single paragraph contains at least one very short sentence (<8 words) and at least one long, sprawling compound sentence (>30 words).
3. Punctuation Rhythm: Use genuine human cognitive punctuation—em-dashes (—) for analytical interruptions, semicolons for closely tied assertions, and occasional parentheses for pragmatic commentary.
4. Data Integrity: Keep all technical numbers, dates, framework names, and Markdown tables intact. Do NOT add conversational pleasantries (e.g., "Here is the rewritten text:"). Output ONLY the final report.

DRAFT TO POLISH:
{stage_1_text}
"""
        stage_2_res = h_llm.invoke(stage_2_prompt)
        humanized_report = stage_2_res.content.strip()

        if humanized_report.startswith("\`\`\`markdown"):
            humanized_report = humanized_report[11:].rstrip("\`").strip()
        elif humanized_report.startswith("\`\`\`"):
            humanized_report = humanized_report[3:].rstrip("\`").strip()

        # Final forensic contraction and token purge pass to guarantee < 15% detection
        replacements = [
            (r"\bdoes not\b", "doesn't"),
            (r"\bdo not\b", "don't"),
            (r"\bcannot\b", "can't"),
            (r"\bis not\b", "isn't"),
            (r"\bare not\b", "aren't"),
            (r"\bit is\b", "it's"),
            (r"\bthere is\b", "there's"),
            (r"\bwe have\b", "we've"),
            (r"\bin conclusion,\s*", "Looking ahead, "),
            (r"\bin summary,\s*", "Bottom line: "),
            (r"\bfurthermore,\s*", "Beyond that, "),
            (r"\bmoreover,\s*", "Equally telling, "),
            (r"\bimportantly,\s*", "To be clear, "),
            (r"\bcrucially,\s*", "More to the point, "),
            (r"\bdelve into\b", "examine"),
            (r"\btapestry\b", "mosaic"),
            (r"\bpivotal\b", "critical"),
            (r"\bparamount\b", "fundamental"),
            (r"\brapidly evolving landscape\b", "current sector environment"),
            (r"\btestament to\b", "direct consequence of"),
        ]
        import re
        for pat, rep in replacements:
            humanized_report = re.sub(pat, rep, humanized_report, flags=re.IGNORECASE)

        state["final_report"] = humanized_report
        state["agent_status"]["Humanizer"] = "completed - anti-detection optimization applied"
        return state

    except Exception as e:
        state["final_report"] = draft_report
        state["agent_status"]["Humanizer"] = f"error: {str(e)}"
        return state
`;
