export interface DetectorScores {
  gptZero: number;
  turnitin: number;
  zeroGpt: number;
  copyLeaks: number;
  winstonAi: number;
  overallAiRisk: number;
}

export interface DetectedMarker {
  marker: string;
  count: number;
}

export interface Humanizer10RulesConfig {
  rule1_12yoReading: boolean;
  rule2_antiAcademicCoffeeShop: boolean;
  rule3_localGeographic: boolean;
  rule3_targetLocation: string;
  rule4_contractionsColloquial: boolean;
  rule5_brandIntegration: boolean;
  rule5_companyName: string;
  rule5_companyInfo: string;
  rule6_nonPushyAuthentic: boolean;
  rule7_fictionalAnecdotes: boolean;
  rule7_anecdoteTheme: string;
  rule8_hookIntroFramework: boolean;
  rule9_dynamicCadence: boolean;
  rule10_targetAvatar: boolean;
  rule10_avatarDescription: string;
}

export interface RuleComplianceAudit {
  ruleId: number;
  title: string;
  passed: boolean;
  score: number; // 0-100
  detail: string;
  metric?: string;
}

export interface DetectabilityAnalysis {
  sentenceCount: number;
  wordCount: number;
  avgSentenceLength: number;
  sentenceStdDev: number;
  burstinessScore: number;
  detectedMarkers: DetectedMarker[];
  markerDensity: number;
  uniformityPenalty: number;
  detectorScores: DetectorScores;
  verdict: string;
  sentenceLengths: number[];
  ruleAudits?: RuleComplianceAudit[];
  readingGradeLevel?: string;
  contractionCount?: number;
  bannedAcademicCount?: number;
}

export interface ResearchAgentStatus {
  name: string;
  status: 'Idle' | 'Running' | 'Completed' | 'Error';
  detail?: string;
}

export interface ResearchPipelineResult {
  query: string;
  subtasks: string[];
  draftReport: string;
  totalLoops?: number;
  loopRoundMetrics?: Array<{
    round: number;
    zerogpt: number;
    turnitin: number;
    overallAiRisk: number;
    burstiness: number;
  }>;
  criticData: {
    strengths?: string[];
    recommended_fixes?: string[];
    overall_assessment?: string;
  };
  finalReport: string;
  finalReportPlainText?: string;
  finalReportMarkdown?: string;
  draftAnalysis: DetectabilityAnalysis;
  finalAnalysis: DetectabilityAnalysis;
  agents?: { name: string; status: string; detail: string }[];
}

export type ResearchResult = ResearchPipelineResult;

