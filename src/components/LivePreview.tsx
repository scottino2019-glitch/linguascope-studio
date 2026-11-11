import React, { useRef, useEffect } from 'react';

interface LivePreviewProps {
  fullCode: string;
  reloadKey: number;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  fullCode,
  reloadKey,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = fullCode;
    }
  }, [fullCode, reloadKey]);

  return (
    <div className="w-full h-full bg-[#f1f5f9] flex flex-col overflow-hidden">
      <iframe
        key={reloadKey}
        ref={iframeRef}
        srcDoc={fullCode}
        title="Anteprima del Sito Standalone"
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-downloads"
        className="w-full h-full border-0 block flex-1 bg-[#f1f5f9]"
      />
    </div>
  );
};
