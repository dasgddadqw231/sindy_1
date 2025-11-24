export enum CoachType {
  GRANNY = '욕쟁이 할머니',
  HEALER = '숲속의 힐러',
  ENERGY = '에너지 코치',
  SHERLOCK = '썰록 분석가',
  TALKER = '대화술사',
}

export enum Tab {
  HOME = 'home',
  DIAGNOSIS = 'diagnosis',
  COACH = 'coach',
  CONTENT = 'content',
  COMMUNITY = 'community',
}

export interface UserProfile {
  nickname: string;
  age: number;
  gender: 'male' | 'female';
  marriageYears: number;
  hasChildren: boolean;
  relationshipStatus: string;
  issues: string[];
  goals: string[];
}

export interface User {
  isOnboarded: boolean;
  profile: UserProfile;
  streakDays: number;
  missionsCompleted: number;
  contentsViewed: number;
  coins: number;
  isSubscribed: boolean;
  activeCoach: CoachType;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  duration?: string;
  imageUrl: string;
  isLocked: boolean;
  coinPrice?: number;
}

export interface DiagnosisItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  score?: number;
  isLocked: boolean;
  coinPrice?: number;
}