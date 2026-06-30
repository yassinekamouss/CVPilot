export type ErrorWithDigest = Error & { digest?: string };

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}