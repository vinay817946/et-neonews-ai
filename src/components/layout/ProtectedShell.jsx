import AuthGuard from "@/components/auth/AuthGuard";
export default function ProtectedShell({ children }) { return <AuthGuard>{children}</AuthGuard>; }
