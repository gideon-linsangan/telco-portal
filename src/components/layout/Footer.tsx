const footerLinks = {
  Plans: ['Starter', 'Plus', 'Pro', 'Business'],
  Support: ['Help centre', 'Contact us', 'Coverage map', 'FAQs'],
  Legal: ['Privacy policy', 'Terms', 'Accessibility'],
}

export function Footer() {
  return (
    <footer className="bg-neutral-ink text-neutral-slate mt-auto">
      <div className="max-w-7xl mx-auto px-12 pt-16">
        <div className="flex flex-col md:flex-row gap-12 justify-between pb-14">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold tracking-tight">
              Telco<span className="text-brand-light">Now</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed">Fast. Simple. Yours.</p>
            <p className="mt-2 text-sm leading-relaxed max-w-xs">
              Australia&apos;s fastest growing 5G network. Built for real people, priced fairly.
            </p>
          </div>

          <div className="flex gap-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate mb-3">{section}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-neutral-slate hover:text-white transition-colors leading-loose"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-5 flex items-center justify-between text-[13px]">
          <span>© {new Date().getFullYear()} TelcoNow Pty Ltd</span>
          <span>All prices include GST</span>
        </div>
      </div>
    </footer>
  )
}
