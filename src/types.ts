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
  agents: { name: string; status: string; detail: string }[];
}
