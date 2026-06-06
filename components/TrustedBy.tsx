const clients = [
  "Bali Sunny Kids", "23Tribes", "Keira Shabira", "pilotintel", "MIX DJ", "lineaaaa", "movme"
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-border bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            Trusted by innovative companies
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {clients.map((client) => (
              <div key={client} className="group">
                <span className="font-display text-xl font-bold text-text-muted/50 group-hover:text-text-muted transition-colors duration-300">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
