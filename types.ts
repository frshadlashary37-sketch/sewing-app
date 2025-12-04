export interface Measurements {
  waist: string;        // دور شکم
  pantsLength: string;  // قد شلوار
  shoulderWidth: string; // عرض شانه
  neck: string;         // دور یقه
  sleeve: string;       // قد آستین
  wrist: string;        // دور مچ
  notes: string;        // توضیحات اضافی
}

export interface Client {
  id: string;
  name: string;
  phoneNumber: string;
  measurements: Measurements;
  createdAt: number;
}

export type ViewState = 'LIST' | 'ADD' | 'DETAILS' | 'EDIT';

export interface GeminiResponse {
  advice: string;
}