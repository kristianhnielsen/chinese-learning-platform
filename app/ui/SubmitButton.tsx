"use client";

import { twMerge } from "tailwind-merge";
import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa6";

export default function SubmitButton({
  children,
  className: extClassName,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={twMerge(
        "grid h-10 items-center justify-items-center rounded-md px-4 py-2 text-light disabled:bg-opacity-65",
        extClassName,
      )}
      disabled={pending}
    >
      {pending ? (
        <FaSpinner className="h-full w-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
