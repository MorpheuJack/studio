import { Square } from 'lucide-react';
import React from 'react';

const companies: { name: string, icon: React.ReactNode }[] = [
  { name: 'Rippling', icon: null },
  { name: 'Google', icon: null },
  { name: 'Gumroad', icon: null },
  { name: 'Stripe', icon: null },
  { name: 'Coinbase', icon: null },
  { name: 'Hopin', icon: null },
  { name: 'Shopify', icon: null },
  { name: 'Splunk', icon: null },
  { name: 'Square', icon: <Square /> },
  { name: 'Toggl', icon: null },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-transparent">
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground">
            CONFIADO PELAS EMPRESAS MAIS AMBICIOSAS DO MUNDO
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
            {companies.map((company) => (
              <div key={company.name} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                {company.icon && React.cloneElement(company.icon as React.ReactElement, { className: 'h-5 w-5' })}
                <span className="text-lg font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
