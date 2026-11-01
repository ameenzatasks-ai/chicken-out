"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Live open/closed badge, computed in Dhaka time whatever the visitor's own
 * timezone. Renders the static hours until mounted so the server HTML and
 * first client render agree.
 */
type OpenState = { state: "open" | "closing" | "closed"; text: string; short: string };

const CLOSING_SOON_MIN = 45;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function minutesNowInDhaka() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.hours.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

export function getOpenState(now: number): OpenState {
  const opens = toMinutes(site.hours.opensAt);
  const closes = toMinutes(site.hours.closesAt);
  const open = closes > opens ? now >= opens && now < closes : now >= opens || now < closes;

  if (!open) return { state: "closed", text: `Closed · opens ${site.hours.opensLabel}`, short: "Closed now" };
  const left = (closes - now + 1440) % 1440;
  if (left <= CLOSING_SOON_MIN)
    return { state: "closing", text: `Closing soon · ${site.hours.closesLabel}`, short: "Closing soon" };
  return { state: "open", text: `Open now · until ${site.hours.closesLabel}`, short: "Open now" };
}

function useOpenState() {
  const [s, setS] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setS(getOpenState(minutesNowInDhaka()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return s;
}

const DOT = {
  open: "bg-[#22C55E]",
  closing: "bg-[#F59E0B]",
  closed: "bg-[#9CA3AF]",
};

export function OpenStatus({ className, compact = false }: { className?: string; compact?: boolean }) {
  const s = useOpenState();

  if (!s) {
    return (
      <span className={cn("flex items-center gap-1.5 whitespace-nowrap", className)}>
        <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        {site.hours.short}
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-2 whitespace-nowrap", className)}>
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {s.state === "open" && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", DOT.open)} />
        )}
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", DOT[s.state])} />
      </span>
      {compact ? s.short : s.text}
    </span>
  );
}
