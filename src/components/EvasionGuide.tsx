import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Layers, FileCheck } from 'lucide-react';

export const EvasionGuide: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      {/* Top Banner */}
      <div
        style={{
          background: '#fffaeb',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e6d5a8',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#fa520f',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: '6px',
          }}
        >
          <BookOpen size={14} />
          <span>Researchub Linguistic &amp; Editing Constitution</span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1f1f1f', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Editing Constraints, Priorities &amp; 31-Pattern Architecture
        </h2>
        <p style={{ fontSize: '13px', color: '#4a4a4a', margin: 0, maxWidth: '64ch', lineHeight: 1.6 }}>
          When constraints conflict, Researchub enforces a strict 4-tier priority hierarchy: preserving factual certainty, respecting the author's input register, dissolving synthetic clichés, and verifying claims against original evidence.
        </p>
      </div>

      {/* Editing Constraints Hierarchy */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid #e5e5e5' }}>
          <ShieldCheck size={18} color="#fa520f" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1f1f1f', margin: 0 }}>
            Hierarchical Priority Order for Conflicting Constraints
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
          {[
            {
              step: '1',
              title: 'Retain Information & Degree of Certainty',
              desc: 'Never fabricate facts, numbers, dates, citations, or implementation details not in original text. Retain negation, comparison objects, scope, conditions, time, and attribution. Do not convert "possible" to "certain", or "planned" to "completed".',
            },
            {
              step: '2',
              title: 'Adhere to Editing Scope & Style',
              desc: 'Polishing does not by default include summarizing or rewriting core arguments. When explicit illustrative examples are requested, clearly distinguish between original facts and new fictional scenarios.',
            },
            {
              step: '3',
              title: 'Match Author Voice & Input Register',
              desc: 'For technical & product docs, preserve terminology, version numbers, and system states. For academic texts, retain necessary formality and qualifiers without forced artificial colloquialisms.',
            },
            {
              step: '4',
              title: 'Resolve 31 Pattern Checkpoints',
              desc: 'Purge vague staging, false contrasts ("It\'s not X, it\'s Y"), dramatic single-sentence fragments, unearned authority claims, and customer service remnants.',
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: '#fafafa',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #e5e5e5',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#1f1f1f',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.step}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1f1f1f' }}>
                  {item.title}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#4a4a4a', lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 31 Pattern Categories */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid #e5e5e5' }}>
          <Layers size={18} color="#fa520f" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1f1f1f', margin: 0 }}>
            The 31-Point Anti-Slop Pattern Checklist (PR-39 Specification)
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {[
            {
              cat: 'A. Setting the Stage',
              items: [
                '1. False contrasts ("It\'s not X, it\'s Y")',
                '2. Single-sentence dramatic fragments',
                '3. Maxims & pseudo-depth metaphors',
                '4. Starting line preparation filler',
                '5. Debating hypothetical enemies',
              ],
            },
            {
              cat: 'B. Formulaic Rhythm',
              items: [
                '6. Forced three-part structures',
                '7. Repeating sentence beginnings',
                '8. Universal suspense dashes',
                '9. Stacking identical determiners',
                '10. Coined buzzwords & labels',
                '11. Passive voice stacking',
              ],
            },
            {
              cat: 'C. Elevating Authority',
              items: [
                '12. High-frequency AI terms (delve, tapestry)',
                '13. Unearned significance clichés',
                '14. Fuzzy relationships & identity guessing',
                '15. Sentence-ending praise phrases',
                '16. Empty promotional slogans',
                '17. Fabricating expert citations',
                '18. Overusing linking verbs',
              ],
            },
            {
              cat: 'D. Typesetting & Emojis',
              items: [
                '19. Decorative bolding obstruction',
                '20. Decorative emojis/arrows in titles',
                '21. Punctuation & quote compliance',
              ],
            },
            {
              cat: 'E. Chat & Draft Remnants',
              items: [
                '22. Customer service greetings ("Good question!")',
                '23. Knowledge boundary guesswork',
                '24. First-sentence title restatements',
                '25. Meta-notes on previous revisions',
              ],
            },
            {
              cat: 'F. Multilingual Clarity',
              items: [
                '26. Layered convoluted modifiers',
                '27. Repetitive "continue + verb"',
                '28. Passive voice stacking',
                '29. Forced parallel 4-character phrasing',
                '30. "With the development of..." clichés',
                '31. Stock ending wishes ("wait and see")',
              ],
            },
          ].map((c) => (
            <div
              key={c.cat}
              style={{
                background: '#fafafa',
                borderRadius: '8px',
                padding: '14px',
                border: '1px solid #e5e5e5',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#fa520f', textTransform: 'uppercase' }}>
                {c.cat}
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#4a4a4a', lineHeight: 1.6 }}>
                {c.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Delivery Verification Checklist */}
      <div
        style={{
          background: '#f0fdf4',
          borderRadius: '12px',
          padding: '20px 24px',
          border: '1px solid #a7f3d0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCheck size={18} color="#059669" />
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#059669', margin: 0 }}>
            Pre-Delivery Verification Checklist (Runs Before Every Output)
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {[
            'Factual certainty preserved (No degree shifts)',
            'No fabricated facts, dates, or metrics',
            'Independent claims & negation intact',
            'Code blocks, URLs, and IDs untouched',
            'Markdown table structures preserved',
            'Zero AI meta-notes or greeting filler',
          ].map((check, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#ffffff',
                border: '1px solid #a7f3d0',
                fontSize: '11px',
                color: '#1f1f1f',
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={13} color="#059669" style={{ flexShrink: 0 }} />
              <span>{check}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
