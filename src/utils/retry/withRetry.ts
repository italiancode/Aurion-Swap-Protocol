"use strict";

import { devLog } from "../logging";
import { RequestCounter } from "../logging/requestCounter";

interface RetryConfig {
  maxAttempts: number;     // Maximum retry attempts
  initialDelay: number;    // Initial delay in ms
  maxDelay: number;        // Maximum delay between retries
  backoffFactor: number;   // Exponential growth factor for delays
  onError?: (error: any) => void; // Callback for handling errors
}

const defaultConfig: RetryConfig = {
  maxAttempts: 3,
  initialDelay: 2000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> => {
  const { maxAttempts, initialDelay, maxDelay, backoffFactor, onError } = {
    ...defaultConfig,
    ...config,
  };

  let attempt = 1;
  let totalRetryTime = 0;

  // Optional delay before starting retries
  await new Promise((resolve) => setTimeout(resolve, initialDelay));

  while (attempt <= maxAttempts) {
    try {
      // Try executing the provided function
      return await fn();
    } catch (error: any) {
      onError?.(error); // Invoke error callback if defined

      const isRateLimit =
        error.message?.includes("429") || error.statusCode === 429;

      if (attempt === maxAttempts) {
        throw new Error(
          `Max retry attempts (${maxAttempts}) reached after ${totalRetryTime}ms. Last error: ${error.message}`
        );
      }

      // Calculate delay (exponential or linear based on rate limiting)
      let delay = isRateLimit
        ? Math.min(initialDelay * Math.pow(backoffFactor, attempt), maxDelay)
        : Math.min(initialDelay * attempt, maxDelay);

      // Add jitter (±25%)
      const jitter = delay * (Math.random() * 0.5 - 0.25);
      delay = Math.min(Math.floor(delay + jitter), maxDelay);

      totalRetryTime += delay;

      // Log retry details
      devLog(
        `Attempt ${attempt}/${maxAttempts} failed. ${
          isRateLimit ? "Rate limited. " : ""
        }Retrying after ${delay}ms delay...`
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }

  throw new Error("Unexpected error: Retry loop exited without a return.");
};
