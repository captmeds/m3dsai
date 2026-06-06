"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function LazyChatWidget() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    let idleHandle: number | undefined;
    const timeoutHandle = window.setTimeout(() => setIsReady(true), 6000);

    if (win.requestIdleCallback) {
      idleHandle = win.requestIdleCallback(() => setIsReady(true), {
        timeout: 5000,
      });
    }

    return () => {
      window.clearTimeout(timeoutHandle);
      if (idleHandle !== undefined && win.cancelIdleCallback) {
        win.cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <ChatWidget />;
}
