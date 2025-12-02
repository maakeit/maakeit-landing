// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Log a custom event to Google Analytics
 * @param action - The action being tracked (e.g., 'click', 'submit', 'view')
 * @param category - The category of the event (e.g., 'button', 'form', 'video')
 * @param label - Optional label for additional context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string) => {
  trackEvent("click", "button", buttonName);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent(
    success ? "form_submit_success" : "form_submit_error",
    "form",
    formName
  );
};

/**
 * Track page views (useful for SPAs)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string) => {
  trackEvent("click", "outbound_link", url);
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("click", "cta", `${ctaName} - ${location}`);
};

