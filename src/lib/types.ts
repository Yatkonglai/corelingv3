export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
  imageUrl?: string;
  isGenerating?: boolean;
  meta?: SchemeMeta;
}

export type AppViewState =
  | 'home'
  | 'conversation'
  | 'generating-response'
  | 'result-ready'
  | 'generating-image'
  | 'recoverable-error';

export type FeedbackKind =
  | 'idle'
  | 'sending'
  | 'response-error'
  | 'image-pending'
  | 'image-error'
  | 'image-success';

export type Language = 'en' | 'zh';

export interface Translation {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  send: string;
  generating: string;
  selectScheme: string;
  generateImage: string;
  apiKeyMissing: string;
  apiKeyPlaceholder: string;
  welcomeMessage: string;
  clearChat: string;
}

export interface SchemeSelection {
  schemeId: string;
  description: string;
}

export interface SchemeMeta {
  version: string;
  schemes: Array<{
    id: string;
    title: string;
    imagePrompt: string;
  }>;
}
