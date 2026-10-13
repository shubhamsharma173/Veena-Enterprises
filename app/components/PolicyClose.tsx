import Link from "next/link";
import { X } from "lucide-react";

export default function PolicyClose({ title }: { title: string }) {
  return (
    <div className="policy-actions">
      <Link
        href="/"
        className="policy-close"
        aria-label={`Close ${title} and return to home`}
      >
        <X size={20} aria-hidden="true" />
        Close
      </Link>
    </div>
  );
}
