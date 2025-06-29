
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface IntegratedIDEProps {
  starterCode: string;
}

export function IntegratedIDE({ starterCode }: IntegratedIDEProps) {
  const [code, setCode] = useState(starterCode);
  const [previewSrcDoc, setPreviewSrcDoc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    // Basic parsing of the code block.
    // This is a simplified approach for the demo.
    const htmlMatch = code.match(/\/\/ HTML -[^\n]*\n([\s\S]*?)\n\/\/ CSS/);
    const cssMatch = code.match(/\/\/ CSS -[^\n]*\n([\s\S]*?)\n\/\/ JAVASCRIPT/);
    const jsMatch = code.match(/\/\/ JAVASCRIPT -[^\n]*\n([\s\S]*)/);
    
    const html = htmlMatch ? htmlMatch[1] : '<div>Verifique a sintaxe do seu bloco de HTML.</div>';
    const css = cssMatch ? cssMatch[1] : '';
    const js = jsMatch ? jsMatch[1] : '';

    setPreviewSrcDoc(`
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script type="module">${js}</script>
        </body>
      </html>
    `);
  };

  // Run code on initial load and whenever code changes
  useEffect(() => {
    const handler = setTimeout(() => {
        runCode();
    }, 500); // Debounce to avoid re-rendering on every keystroke
    return () => clearTimeout(handler);
  }, [code]);

  return (
    <div className="flex flex-col h-full w-full bg-card rounded-xl border overflow-hidden">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-px bg-border h-full">
        {/* Editor Pane */}
        <div className="flex flex-col bg-background h-full">
          <div className="flex-shrink-0 p-2 border-b border-border flex justify-between items-center">
            <h3 className="font-mono text-sm font-semibold text-muted-foreground">estudio.js</h3>
            <Button size="sm" onClick={runCode}>
              <Play className="mr-2" />
              Executar
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full flex-grow p-4 font-mono text-sm !border-0 !rounded-none focus-visible:!ring-0 resize-none bg-background"
            placeholder="Escreva seu código aqui..."
          />
        </div>
        {/* Preview Pane */}
        <div className="flex flex-col bg-background h-full">
          <div className="flex-shrink-0 p-2 border-b border-border">
            <h3 className="font-mono text-sm font-semibold text-muted-foreground">Resultado</h3>
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={previewSrcDoc}
            title="Preview"
            sandbox="allow-scripts"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
