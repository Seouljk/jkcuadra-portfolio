"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/content";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function subscribe(onTick: () => void) {
  const timer = window.setInterval(onTick, 1000);
  return () => window.clearInterval(timer);
}

const getTime = () => formatter.format(Date.now());
const getServerTime = () => "—";

/** Local time in Cagayan de Oro. The server renders an em dash, so hydration never mismatches. */
export function LiveClock() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return <>{time}</>;
}
