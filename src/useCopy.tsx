import { useState, useRef } from "react";

export function useCopy(duration = 1500) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null!);

  function copyText() {
    ref.current.disabled = false;
    ref.current.select();
    ref.current.disabled = true;
    document.execCommand("copy");
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, duration);
  }

  return [ref, copyText, copied] as const;
}
