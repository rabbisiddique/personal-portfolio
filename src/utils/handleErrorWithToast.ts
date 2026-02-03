// utils/handleErrorWithToast.ts
import { toast } from "react-hot-toast";

export function handleErrorWithToast(
  error: unknown,
  fallbackMessage: string = "Something went wrong",
) {
  let message: string;

  if (error instanceof Error) {
    message = error.message || fallbackMessage;
    console.error("Error:", error); // logs full Error for debugging
  } else {
    message = fallbackMessage;
    console.error("Unexpected error:", error); // logs non-Error values
  }

  toast.error(message); // show toast
  return message;
}
