import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOrigin } from "@/hooks/useOrigin";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useState } from "react";

interface Props {
  url: string;
}

const ShortLinkControll = ({ url }: Props) => {
  const [copied, setCopied] = useState(false);
  const origin = useOrigin();

  useGSAP(() => {
    gsap.fromTo(
      "icon",
      {
        scale: 0.5,
        opacity: 0,
        duration: 0.2,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
        yoyo: true,
        stagger: 0.1,
      }
    );
  }, [copied]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const onCopy = useCallback(() => {
    setCopied((prev) => !prev);

    navigator.clipboard.writeText(`${origin}/${url}`);
  }, [origin, url]);
  return (
    <div className="flex items-center gap-x-2">
      <p>{`${origin}/${url}`}</p>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <button onClick={onCopy}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="icon"
                className="lucide lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="icon"
                className="lucide lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>Copied</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ShortLinkControll;
