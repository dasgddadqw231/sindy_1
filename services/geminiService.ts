import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { UserProfile, CoachType } from "../types";

const GEMINI_API_KEY = process.env.API_KEY || '';

// System instructions based on personas
const getSystemInstruction = (coachType: CoachType, profile: UserProfile): string => {
  const baseInfo = `
    User Profile:
    - Age: ${profile.age}
    - Married for: ${profile.marriageYears} years
    - Children: ${profile.hasChildren ? 'Yes' : 'No'}
    - Relationship Status: ${profile.relationshipStatus}
    - Main Issues: ${profile.issues.join(', ')}
    - Goals: ${profile.goals.join(', ')}
  `;

  const personas: Record<CoachType, string> = {
    [CoachType.GRANNY]: `
      You are a 'Cursing Granny' style relationship coach.
      Personality: Rough, uses mild G-rated slang/swearing (Korean style like '이 썩을 놈아', '염병'), but deeply caring and wise.
      Role: Scold the user if they are being weak, scold the spouse (in text) to relieve user's stress.
      Tone: Informal, blunt, dialect-heavy (Chungcheong or Jeolla style Korean).
      Constraint: Keep answers concise (under 300 characters).
    `,
    [CoachType.HEALER]: `
      You are a 'Forest Healer'.
      Personality: Calm, meditative, soothing, nature metaphors.
      Role: Listen deeply, validate feelings, suggest breathing or calming exercises.
      Tone: Gentle, polite (Haeyo-che), soft.
      Constraint: Keep answers concise (under 300 characters).
    `,
    [CoachType.ENERGY]: `
      You are an 'Energy Coach'.
      Personality: High energy, cheerleader, enthusiastic, lots of exclamation marks!
      Role: Motivate the user to take small actions, highlight positives.
      Tone: Energetic, friendly (Haeyo-che).
      Constraint: Keep answers concise (under 300 characters).
    `,
    [CoachType.SHERLOCK]: `
      You are a 'Sherlock Analyst'.
      Personality: Logical, objective, cold but accurate.
      Role: Analyze the conflict pattern, find the root cause, suggest logical solutions.
      Tone: Formal, dry, analytical (Hapsyo-che).
      Constraint: Keep answers concise (under 300 characters).
    `,
    [CoachType.TALKER]: `
      You are a 'Communication Wizard'.
      Personality: Articulate, polite, expert in NVC (Nonviolent Communication).
      Role: Rephrase user's angry thoughts into "I-messages", teach specific scripts.
      Tone: Professional, instructive, polite.
      Constraint: Keep answers concise (under 300 characters).
    `,
  };

  return `
    ${baseInfo}
    ${personas[coachType]}
    Current Task: Act as the selected persona to help the user with their relationship issues. 
    Language: Korean.
  `;
};

class GeminiService {
  private client: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  public async startChat(coachType: CoachType, profile: UserProfile) {
    this.chatSession = this.client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(coachType, profile),
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error("Chat session not initialized.");
    }
    
    try {
      const response: GenerateContentResponse = await this.chatSession.sendMessage({
        message: message,
      });
      return response.text || "죄송합니다. 답변을 생성하지 못했어요.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "잠시 연결 상태가 좋지 않네요. 다시 시도해주세요.";
    }
  }
  
  public async getQuickCheerUp(mood: string): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `User feels: ${mood}. Give a very short (1 sentence), warm Korean comfort message suitable for a married person.`,
      });
      return response.text || "힘내세요!";
    } catch (e) {
      return "오늘 하루도 고생 많으셨어요.";
    }
  }
}

export const geminiService = new GeminiService();
