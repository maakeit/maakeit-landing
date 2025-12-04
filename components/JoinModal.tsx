"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Loader2, CheckCircle, User, Briefcase } from "lucide-react";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Role = "creator" | "brand";

interface FormData {
  name: string;
  email: string;
  role: Role | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle modal open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setShowSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      });

      if (res.ok) {
        setShowSuccess(true);
        // Reset form
        setFormData({ name: "", email: "", role: null });
        // Close modal after showing success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        const data = await res.json();
        setSubmitError(data.error || data.message || "Something went wrong");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | Role) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSubmitError("");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#3F2E1F]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-[90%] max-w-[460px] rounded-2xl bg-[#FFF8F1] p-6 shadow-xl transition-all duration-300 md:p-10 ${
          isAnimating
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-2 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute right-4 top-4 rounded-full p-2 text-[#3F2E1F]/60 transition-colors hover:bg-[#F5EFE7] hover:text-[#3F2E1F] disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {showSuccess ? (
          // Success state
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5E3C]/10">
              <CheckCircle className="h-8 w-8 text-[#8B5E3C]" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-[#3F2E1F]">
              You&apos;re in!
            </h3>
            <p className="text-[#3F2E1F]/70">
              We&apos;ll keep you updated on our launch.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-[#3F2E1F] md:text-3xl">
                Join the Community
              </h2>
              <p className="mt-2 text-[#3F2E1F]/70">
                Get early access when we launch
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-[#3F2E1F]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your name"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-[#3F2E1F] placeholder:text-[#3F2E1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 ${
                    errors.name ? "border-red-400" : "border-[#8B5E3C]/20"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#3F2E1F]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-[#3F2E1F] placeholder:text-[#3F2E1F]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 ${
                    errors.email ? "border-red-400" : "border-[#8B5E3C]/20"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Role selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3F2E1F]">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Creator option */}
                  <button
                    type="button"
                    onClick={() => handleInputChange("role", "creator")}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                      formData.role === "creator"
                        ? "border-[#8B5E3C] bg-[#8B5E3C]/10"
                        : "border-[#8B5E3C]/20 bg-white hover:border-[#8B5E3C]/40"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        formData.role === "creator"
                          ? "bg-[#8B5E3C] text-white"
                          : "bg-[#F5EFE7] text-[#8B5E3C]"
                      }`}
                    >
                      <User className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-medium ${
                        formData.role === "creator"
                          ? "text-[#8B5E3C]"
                          : "text-[#3F2E1F]"
                      }`}
                    >
                      Creator
                    </span>
                  </button>

                  {/* Brand option */}
                  <button
                    type="button"
                    onClick={() => handleInputChange("role", "brand")}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                      formData.role === "brand"
                        ? "border-[#8B5E3C] bg-[#8B5E3C]/10"
                        : "border-[#8B5E3C]/20 bg-white hover:border-[#8B5E3C]/40"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        formData.role === "brand"
                          ? "bg-[#8B5E3C] text-white"
                          : "bg-[#F5EFE7] text-[#8B5E3C]"
                      }`}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-medium ${
                        formData.role === "brand"
                          ? "text-[#8B5E3C]"
                          : "text-[#3F2E1F]"
                      }`}
                    >
                      Brand / Founder
                    </span>
                  </button>
                </div>
                {errors.role && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="text-center text-sm text-red-500">{submitError}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B5E3C] px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-[#7A5235] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join the Community"
                )}
              </button>
            </form>

            {/* Footer text */}
            <p className="mt-4 text-center text-xs text-[#3F2E1F]/50">
              No spam. We&apos;ll only send you important updates.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

