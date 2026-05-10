import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Dumbbell size={48} className="text-primary mb-4" />
      <h1 className="text-4xl font-bold text-foreground mb-2">404 — Page Not Found</h1>
      <p className="text-muted mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
