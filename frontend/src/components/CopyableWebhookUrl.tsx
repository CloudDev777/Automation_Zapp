import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CopyableWebhookUrl = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      title={url} 
      className="text-xs text-gray-500 flex items-center gap-2 ml-3 cursor-pointer  rounded px-3 py-2 transition-colors"
    >
      <span>Webhook URL</span>
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </div>
  );
};

export default CopyableWebhookUrl;
