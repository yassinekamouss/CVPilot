export type AuthProvider = "google" | "linkedin";

export type SettingsStatus = "already-connected" | "linked";

export interface LoginSearchParams {
  error?: string;
  existingProvider?: AuthProvider;
}

export interface SettingsSearchParams {
  error?: string;
  status?: SettingsStatus;
}