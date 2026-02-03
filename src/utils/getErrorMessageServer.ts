export function getErrorMessageServer(
  error: unknown,
  fallback = "Something went wrong",
) {
  if (error instanceof Error) return error.message;
  console.error("Unexpected error:", error);
  return fallback;
}
