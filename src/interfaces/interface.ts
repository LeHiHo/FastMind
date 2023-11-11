export interface JoinData {
  id: string;
  password: string;
  name: string;
  picture?: string; 
}

export interface FormData extends JoinData {
  confirmPassword: string; // JoinData에서 confirmPassword만 추가
}

export interface ValidationInput {
  fieldName: keyof FormData;
  value: string;
  formData: FormData;
}
