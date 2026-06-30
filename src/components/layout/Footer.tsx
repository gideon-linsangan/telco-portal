const footerLinks = {
  Plans: ['Starter', 'Plus', 'Pro', 'Business'],
  Support: ['Help centre', 'Contact us', 'Coverage map', 'Network status'],
  Legal: ['Privacy policy', 'Terms of service', 'Accessibility'],
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-muted mt-auto">
      <div className="max-w-7xl mx-auto px-12 py-16">
        <div className="flex flex-col md:flex-row gap-12 justify-between">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold tracking-tight">
              Telco<span className="text-brand-purple-light">Now</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Australia&apos;s fastest 5G network. Flexible plans, no lock-in contracts.
            </p>
          </div>

          <div className="flex gap-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-white text-sm font-semibold mb-4">{section}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-brand-muted hover:text-white transition-colors leading-loose"
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

        <div className="border-t border-white/10 mt-12 pt-8 text-sm">
          © {new Date().getFullYear()} TelcoNow Pty Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
