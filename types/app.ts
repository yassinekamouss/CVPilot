import type { LoginSearchParams, SettingsSearchParams } from "@/types/auth";
import type { ErrorWithDigest } from "@/types/errors";

export interface ErrorPageProps {
  error: ErrorWithDigest;
  reset: () => void;
}

export interface GlobalErrorProps {
  error: ErrorWithDigest;
  reset: () => void;
}

export interface LoginPageProps {
  searchParams: Promise<LoginSearchParams>;
}

export interface SettingsPageProps {
  searchParams: Promise<SettingsSearchParams>;
}