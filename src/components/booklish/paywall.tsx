export function ProBadge({ ar }: { ar?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
      {ar ? "مميز" : "PRO"}
    </span>
  );
}

export function LockIcon() {
  return null;
}

export function PaywallDialog({ open, onClose }: { open: boolean; onClose: () => void; reason?: string }) {
  return null;
}

export function Paywall() {
  return null;
}
