"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FilePlus2,
  FileText,
  Filter,
  Mail,
  Plus,
  ReceiptText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type View = "dashboard" | "invoices" | "clients" | "payments";
type InvoiceStatus = "Paid" | "Sent" | "Overdue" | "Draft";
type PaymentMethod = "Card" | "Bank Transfer" | "PayNow" | "Wise";

type Client = {
  id: string;
  name: string;
  market: string;
  contact: string;
  revenue: number;
  outstanding: number;
  currency: "SGD" | "MYR" | "IDR" | "PHP" | "THB";
  health: "Current" | "Watch" | "Priority";
};

type Invoice = {
  id: string;
  clientId: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: Client["currency"];
  status: InvoiceStatus;
};

type Payment = {
  id: string;
  invoiceId: string;
  clientName: string;
  method: PaymentMethod;
  reference: string;
  amount: number;
  currency: Client["currency"];
  date: string;
};

type LineItem = {
  id: number;
  description: string;
  quantity: number;
  rate: number;
};

const clients: Client[] = [];
const invoices: Invoice[] = [];
const payments: Payment[] = [];
const revenueSeries: Array<{ label: string; value: number }> = [];

const navItems: Array<{ id: View; label: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "invoices", label: "Invoices", icon: ReceiptText },
  { id: "clients", label: "Clients", icon: Users },
  { id: "payments", label: "Payments", icon: WalletCards },
];

const paymentMethods: PaymentMethod[] = ["Card", "Bank Transfer", "PayNow", "Wise"];
const statusFilters: Array<InvoiceStatus | "All"> = ["All", "Paid", "Sent", "Overdue", "Draft"];

function formatMoney(amount: number, currency: Client["currency"]) {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(amount);
}

function statusClasses(status: InvoiceStatus) {
  const map: Record<InvoiceStatus, string> = {
    Paid: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
    Sent: "border-sky-400/35 bg-sky-400/10 text-sky-200",
    Overdue: "border-rose-400/35 bg-rose-400/10 text-rose-200",
    Draft: "border-slate-400/30 bg-slate-400/10 text-slate-200",
  };

  return map[status];
}

function healthClasses(health: Client["health"]) {
  const map: Record<Client["health"], string> = {
    Current: "text-emerald-200 bg-emerald-400/10 border-emerald-400/30",
    Watch: "text-amber-200 bg-amber-400/10 border-amber-400/30",
    Priority: "text-rose-200 bg-rose-400/10 border-rose-400/30",
  };

  return map[health];
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-secondary/70 text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary"
    >
      {children}
    </button>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Banknote;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-card/82 p-4 shadow-lg shadow-black/10">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-accent-primary/25 bg-accent-primary/10 text-accent-primary">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-xs text-text-muted">No data</span>
      </div>
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-xs text-text-muted">{detail}</p>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`inline-flex min-w-20 justify-center rounded-md border px-2.5 py-1 text-xs font-medium ${statusClasses(status)}`}>
      {status}
    </span>
  );
}

function InvoiceTable({
  rows,
  compact = false,
  onRecordPayment,
}: {
  rows: Invoice[];
  compact?: boolean;
  onRecordPayment: () => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border text-xs uppercase text-text-muted">
          <tr>
            <th className="py-3 pr-4 font-medium">Invoice</th>
            <th className="py-3 pr-4 font-medium">Client</th>
            <th className="py-3 pr-4 font-medium">Due</th>
            <th className="py-3 pr-4 font-medium">Amount</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center text-sm text-text-muted">
                No invoices yet.
              </td>
            </tr>
          )}
          {rows.map((invoice) => (
            <tr key={invoice.id} className="text-text-secondary">
              <td className="py-4 pr-4 font-mono text-xs text-text-primary">{invoice.id}</td>
              <td className="py-4 pr-4">{invoice.clientName}</td>
              <td className="py-4 pr-4">{invoice.dueDate}</td>
              <td className="py-4 pr-4 font-medium text-text-primary">{formatMoney(invoice.amount, invoice.currency)}</td>
              <td className="py-4 pr-4">
                <InvoiceStatusBadge status={invoice.status} />
              </td>
              <td className="py-4">
                <div className="flex justify-end gap-2">
                  <IconButton label={`View ${invoice.id}`}>
                    <Eye className="h-4 w-4" />
                  </IconButton>
                  <IconButton label={`Download ${invoice.id}`}>
                    <Download className="h-4 w-4" />
                  </IconButton>
                  {!compact && (
                    <IconButton label={`Record payment for ${invoice.id}`} onClick={onRecordPayment}>
                      <CircleDollarSign className="h-4 w-4" />
                    </IconButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RevenueChart() {
  const max = Math.max(...revenueSeries.map((item) => item.value), 0);

  return (
    <div className="rounded-lg border border-border bg-bg-card/82 p-5 shadow-lg shadow-black/10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Revenue Trend</h2>
          <p className="text-sm text-text-muted">SEA billing run, normalized to SGD equivalent</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary/80 px-3 py-2 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary"
        >
          Monthly <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex h-64 items-center justify-center rounded-md border border-dashed border-border bg-bg-secondary/45 px-4 text-center text-sm text-text-muted">
        {max === 0 ? (
          <span>Revenue chart will populate when live invoice data is connected.</span>
        ) : (
          <div className="flex h-full w-full items-end gap-3 border-b border-l border-border px-2 pb-2">
            {revenueSeries.map((item) => (
              <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-2">
                <div
                  className="min-h-8 rounded-t-md bg-gradient-to-t from-accent-primary/55 to-cyan-200/90 shadow-[0_0_24px_rgba(56,189,248,0.22)]"
                  style={{ height: `${(item.value / max) * 100}%` }}
                  title={`${item.label}: ${item.value}k`}
                />
                <span className="text-center text-xs text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NewInvoiceModal({ onClose }: { onClose: () => void }) {
  const [clientName, setClientName] = useState("");
  const [clientMarket, setClientMarket] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [currency, setCurrency] = useState<Client["currency"]>("SGD");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: "", quantity: 1, rate: 0 },
  ]);

  const subtotal = lineItems.reduce((total, item) => total + item.quantity * item.rate, 0);
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  function updateLineItem(id: number, patch: Partial<Omit<LineItem, "id">>) {
    setLineItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addLineItem() {
    setLineItems((items) => [
      ...items,
      { id: Date.now(), description: "", quantity: 1, rate: 0 },
    ]);
  }

  function removeLineItem(id: number) {
    setLineItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-invoice-title">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-border bg-bg-primary shadow-2xl shadow-black/50">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg-primary/95 px-5 py-4 backdrop-blur">
          <div>
            <h2 id="new-invoice-title" className="text-xl font-semibold text-text-primary">New Invoice</h2>
            <p className="text-sm text-text-muted">Build line items and preview totals before sending.</p>
          </div>
          <IconButton label="Close new invoice" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm text-text-secondary">
                Client
                <input
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="Client name"
                  className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
                />
              </label>
              <label className="block text-sm text-text-secondary">
                Currency
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value as Client["currency"])}
                  className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
                >
                  {["SGD", "MYR", "IDR", "PHP", "THB"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-text-secondary">
                Market
                <input
                  value={clientMarket}
                  onChange={(event) => setClientMarket(event.target.value)}
                  placeholder="Market"
                  className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
                />
              </label>
              <label className="block text-sm text-text-secondary">
                Billing contact
                <input
                  value={clientContact}
                  onChange={(event) => setClientContact(event.target.value)}
                  placeholder="Email or contact"
                  className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
                />
              </label>
            </div>

            <div className="space-y-3">
              {lineItems.map((item) => (
                <div key={item.id} className="grid gap-3 rounded-lg border border-border bg-bg-card/70 p-3 md:grid-cols-[1fr_90px_120px_40px]">
                  <label className="text-xs text-text-muted">
                    Description
                    <input
                      value={item.description}
                      onChange={(event) => updateLineItem(item.id, { description: event.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none"
                    />
                  </label>
                  <label className="text-xs text-text-muted">
                    Qty
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateLineItem(item.id, { quantity: Number(event.target.value) })}
                      className="mt-1 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none"
                    />
                  </label>
                  <label className="text-xs text-text-muted">
                    Rate
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(event) => updateLineItem(item.id, { rate: Number(event.target.value) })}
                      className="mt-1 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none"
                    />
                  </label>
                  <div className="flex items-end">
                    <IconButton label="Remove line item" onClick={() => removeLineItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary"
            >
              <Plus className="h-4 w-4" /> Add line item
            </button>
          </div>

          <aside className="rounded-lg border border-border bg-bg-card/82 p-4">
            <h3 className="text-base font-semibold text-text-primary">Invoice Preview</h3>
            <p className="mt-1 text-sm text-text-secondary">{clientName || "Client not selected"}</p>
            <p className="text-xs text-text-muted">
              {[clientMarket, clientContact].filter(Boolean).join(" · ") || "Add client details to preview the invoice."}
            </p>
            <div className="my-5 space-y-3 border-y border-border py-4 text-sm">
              <div className="flex justify-between gap-4 text-text-secondary">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between gap-4 text-text-secondary">
                <span>Tax estimate</span>
                <span>{formatMoney(tax, currency)}</span>
              </div>
              <div className="flex justify-between gap-4 text-lg font-semibold text-text-primary">
                <span>Total</span>
                <span>{formatMoney(total, currency)}</span>
              </div>
            </div>
            <div className="grid gap-2">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                <Send className="h-4 w-4" /> Send invoice
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary">
                <FileText className="h-4 w-4" /> Save draft
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function RecordPaymentModal({ onClose }: { onClose: () => void }) {
  const [method, setMethod] = useState<PaymentMethod>("Bank Transfer");
  const openInvoices = invoices.filter((invoice) => invoice.status !== "Paid");
  const [invoiceId, setInvoiceId] = useState(openInvoices[0]?.id ?? "");
  const selectedInvoice = openInvoices.find((invoice) => invoice.id === invoiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="record-payment-title">
      <div className="w-full max-w-xl rounded-lg border border-border bg-bg-primary shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 id="record-payment-title" className="text-xl font-semibold text-text-primary">Record Payment</h2>
            <p className="text-sm text-text-muted">Track received funds against an open invoice.</p>
          </div>
          <IconButton label="Close payment modal" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="space-y-5 p-5">
          <label className="block text-sm text-text-secondary">
            Invoice
            <select
              value={invoiceId}
              onChange={(event) => setInvoiceId(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
              disabled={openInvoices.length === 0}
            >
              {openInvoices.length === 0 && (
                <option value="">No open invoices</option>
              )}
              {openInvoices.map((invoice) => (
                <option key={invoice.id} value={invoice.id}>
                  {invoice.id} · {invoice.clientName}
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className="mb-2 text-sm text-text-secondary">Method</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {paymentMethods.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMethod(item)}
                  className={`rounded-md border px-3 py-2 text-sm transition ${
                    method === item
                      ? "border-accent-primary bg-accent-primary/15 text-text-primary"
                      : "border-border bg-bg-secondary text-text-secondary hover:border-accent-primary/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-text-secondary">
              Amount
              <input
                readOnly
                value={selectedInvoice ? formatMoney(selectedInvoice.amount, selectedInvoice.currency) : ""}
                placeholder="Select an open invoice"
                className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
              />
            </label>
            <label className="block text-sm text-text-secondary">
              Reference
              <input
                placeholder="Payment reference"
                className="mt-2 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-text-primary outline-none"
              />
            </label>
          </div>

          <button
            type="button"
            disabled={!selectedInvoice}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="h-4 w-4" /> Mark invoice as paid
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BillingPlatformPrototype() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        invoice.id.toLowerCase().includes(normalizedQuery) ||
        invoice.clientName.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const totalRevenueSgd = 0;
  const outstandingSgd = 0;
  const paidCount = invoices.filter((invoice) => invoice.status === "Paid").length;
  const overdueCount = invoices.filter((invoice) => invoice.status === "Overdue").length;

  return (
    <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-md border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-sm text-accent-primary">
              M3DSAI Billing Platform
            </p>
            <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">Interactive Billing Dashboard</h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
              Prototype workspace for SEA invoices, client balances, payments and billing operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-card px-4 py-3 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary"
            >
              <CreditCard className="h-4 w-4" /> Record payment
            </button>
            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <FilePlus2 className="h-4 w-4" /> New invoice
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-lg border border-border bg-bg-card/78 p-3 shadow-xl shadow-black/15">
            <nav aria-label="Billing platform sections" className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition ${
                    activeView === item.id
                      ? "bg-accent-primary text-slate-950"
                      : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 rounded-lg border border-border bg-bg-secondary/60 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <ShieldCheck className="h-4 w-4 text-emerald-300" /> Edge ready
              </div>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">
                D1 schema, R2 PDFs, Stripe webhooks and JWT auth are represented by the UI flows.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {activeView === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard icon={Banknote} label="Revenue" value={formatMoney(totalRevenueSgd, "SGD")} detail="June recognized and pending" />
                  <StatCard icon={Clock3} label="Outstanding" value={formatMoney(outstandingSgd, "SGD")} detail="Across SGD equivalent balances" />
                  <StatCard icon={ReceiptText} label="Paid Invoices" value={String(paidCount)} detail="Settled this cycle" />
                  <StatCard icon={FileText} label="Overdue" value={String(overdueCount)} detail="Needs follow-up today" />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <RevenueChart />
                  <div className="rounded-lg border border-border bg-bg-card/82 p-5 shadow-lg shadow-black/10">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-text-primary">Recent Invoices</h2>
                        <p className="text-sm text-text-muted">Latest billing activity</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveView("invoices")}
                        className="text-sm text-accent-primary hover:text-text-primary"
                      >
                        View all
                      </button>
                    </div>
                    <InvoiceTable rows={invoices.slice(0, 4)} compact onRecordPayment={() => setShowPaymentModal(true)} />
                  </div>
                </div>
              </div>
            )}

            {activeView === "invoices" && (
              <div className="rounded-lg border border-border bg-bg-card/82 p-5 shadow-lg shadow-black/10">
                <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">Invoices</h2>
                    <p className="text-sm text-text-muted">Filter, review and act on billing documents.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="relative block min-w-64">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search invoices or clients"
                        className="w-full rounded-md border border-border bg-bg-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none"
                      />
                    </label>
                    <div className="flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-3 py-2">
                      <Filter className="h-4 w-4 text-text-muted" />
                      <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value as InvoiceStatus | "All")}
                        className="bg-transparent text-sm text-text-primary outline-none"
                      >
                        {statusFilters.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <InvoiceTable rows={filteredInvoices} onRecordPayment={() => setShowPaymentModal(true)} />
              </div>
            )}

            {activeView === "clients" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Clients</h2>
                  <p className="text-sm text-text-muted">Revenue, outstanding balances and billing health per client.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {clients.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border bg-bg-card/70 p-8 text-center text-sm text-text-muted md:col-span-2">
                      No clients yet.
                    </div>
                  )}
                  {clients.map((client) => (
                    <article key={client.id} className="rounded-lg border border-border bg-bg-card/82 p-5 shadow-lg shadow-black/10">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">{client.name}</h3>
                          <p className="text-sm text-text-muted">{client.market}</p>
                        </div>
                        <span className={`rounded-md border px-2.5 py-1 text-xs ${healthClasses(client.health)}`}>
                          {client.health}
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-border bg-bg-secondary/65 p-3">
                          <p className="text-xs text-text-muted">Revenue</p>
                          <p className="mt-1 font-semibold text-text-primary">{formatMoney(client.revenue, client.currency)}</p>
                        </div>
                        <div className="rounded-md border border-border bg-bg-secondary/65 p-3">
                          <p className="text-xs text-text-muted">Outstanding</p>
                          <p className="mt-1 font-semibold text-text-primary">{formatMoney(client.outstanding, client.currency)}</p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button type="button" className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary">
                          <Mail className="h-4 w-4" /> Email
                        </button>
                        <button type="button" className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-secondary transition hover:border-accent-primary/50 hover:text-text-primary">
                          <Settings className="h-4 w-4" /> Manage
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeView === "payments" && (
              <div className="rounded-lg border border-border bg-bg-card/82 p-5 shadow-lg shadow-black/10">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">Payments</h2>
                    <p className="text-sm text-text-muted">History log with method and reference tracking.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                  >
                    <CreditCard className="h-4 w-4" /> Record payment
                  </button>
                </div>
                <div className="space-y-3">
                  {payments.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border bg-bg-secondary/60 p-8 text-center text-sm text-text-muted">
                      No payments recorded yet.
                    </div>
                  )}
                  {payments.map((payment) => (
                    <article key={payment.id} className="grid gap-4 rounded-lg border border-border bg-bg-secondary/60 p-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-mono text-sm font-semibold text-text-primary">{payment.id}</h3>
                          <span className="rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted">{payment.method}</span>
                        </div>
                        <p className="mt-2 text-sm text-text-secondary">{payment.clientName} · {payment.invoiceId}</p>
                        <p className="mt-1 text-xs text-text-muted">{payment.reference} · {payment.date}</p>
                      </div>
                      <p className="text-lg font-semibold text-text-primary">{formatMoney(payment.amount, payment.currency)}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInvoiceModal && <NewInvoiceModal onClose={() => setShowInvoiceModal(false)} />}
      {showPaymentModal && <RecordPaymentModal onClose={() => setShowPaymentModal(false)} />}
    </section>
  );
}
