import { useState, useRef, useId } from "react";
import { Check, Send, AlertCircle, ShieldCheck, ChevronDown } from "lucide-react";
import Button from "../ui/Button.jsx";
import { SITE } from "../../config.js";

const INQUIRY_TYPES = [
  "IP Transit",
  "Inter-City Connectivity",
  "Cloud Connectivity",
  "Managed Network Operations",
  "Professional Services",
  "IPv4 Leasing",
  "IPv4 Buyer / Lessee Inquiry",
  "IPv4 Seller / Lessor Inquiry",
  "Partnership Inquiry",
  "General Business Inquiry",
];

/* Field length caps — bound input so a single field can't be abused with an
   unbounded payload (defence-in-depth even for a front-end-only form). */
const LIMITS = { first: 60, last: 60, email: 120, company: 120, phone: 32, message: 1200 };

/* Pragmatic email shape check (front-end only; the real gate is server-side). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Notched-outline floating label (Material style). The border is drawn by an
   overlaid <fieldset>; its <legend> cuts a REAL gap in the top border — when the
   field is focused or filled the legend expands to the label's width, opening a
   transparent break in the outline (no background chip, so nothing paints over
   the glass panel). A separate visible <label> rides up into that gap. A <select>
   never matches :placeholder-shown, so it is treated as permanently filled — the
   label sits up and the notch stays open. Transitions are reduced-motion gated. */
const FLOATED =
  "group-focus-within:top-0 group-focus-within:text-[11px] group-focus-within:font-medium " +
  "group-has-[.peer:not(:placeholder-shown)]:top-0 group-has-[.peer:not(:placeholder-shown)]:text-[11px] group-has-[.peer:not(:placeholder-shown)]:font-medium";

function FloatingField({ id, label, required, error, errId, textarea = false, select = false, rows, children, ...rest }) {
  const Tag = textarea ? "textarea" : select ? "select" : "input";
  const restTop = textarea ? "top-6" : "top-1/2";
  const labelColor = error
    ? "text-danger"
    : "text-grey-dim group-focus-within:text-electric group-has-[.peer:not(:placeholder-shown)]:text-electric";
  const borderColor = error ? "border-danger" : "border-line group-focus-within:border-electric";
  const text = `${label}${required ? " *" : ""}`;
  return (
    <div className="group relative">
      <Tag
        id={id}
        rows={textarea ? rows : undefined}
        placeholder={select ? undefined : " "}
        className={`peer w-full rounded-sm border-0 bg-navy-deep/60 px-[15px] py-3.5 text-[14.5px] text-ink outline-none placeholder:text-transparent ${
          textarea ? "resize-y" : ""
        } ${select ? "cursor-pointer appearance-none pr-10" : ""}`}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
        {...rest}
      >
        {children}
      </Tag>
      {/* select chevron */}
      {select && (
        <ChevronDown
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 z-[2] -translate-y-1/2 text-electric"
        />
      )}
      {/* visible floating label — rides from placeholder position up onto the border */}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3.5 ${restTop} z-[2] -translate-y-1/2 text-[14.5px] transition-all duration-200 ${FLOATED} ${labelColor}`}
      >
        {text}
      </label>
      {/* outline with a real notch — the legend opens the gap (styles in index.css) */}
      <fieldset aria-hidden="true" className={`field-fieldset ${borderColor}`}>
        <legend className="field-legend">
          <span>{text}</span>
        </legend>
      </fieldset>
    </div>
  );
}

const EMPTY = { first: "", last: "", email: "", company: "", phone: "", type: INQUIRY_TYPES[0], message: "", consent: false };

function validate(form) {
  const e = {};
  if (!form.first.trim()) e.first = "Please enter your first name.";
  if (!form.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Please enter a valid email address.";
  if (!form.message.trim()) e.message = "Please tell us how we can help.";
  if (!form.consent) e.consent = "Please confirm you agree to be contacted.";
  return e;
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // gate error display until first submit
  const [sent, setSent] = useState(false);
  const honeypot = useRef(""); // bots fill hidden field; humans never see it
  const formRef = useRef(null);
  const uid = useId();
  const fid = (k) => `${uid}-${k}`;

  const set = (k) => (e) => {
    const raw = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const value = typeof raw === "string" && LIMITS[k] ? raw.slice(0, LIMITS[k]) : raw;
    setForm((f) => ({ ...f, [k]: value }));
    if (submitted) setErrors(validate({ ...form, [k]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (honeypot.current) return; // silently drop bot submissions
    const eMap = validate(form);
    setErrors(eMap);
    if (Object.keys(eMap).length) {
      const first = ["first", "email", "message", "consent"].find((k) => eMap[k]);
      formRef.current?.querySelector(`[data-err="${first}"]`)?.focus();
      return;
    }
    // Placeholder submission only — no network request is made.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-glass-edge bg-glass-dark p-[44px] text-center shadow-glass backdrop-blur-xl">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />
        <div className="mx-auto mb-5 grid h-[58px] w-[58px] place-items-center rounded-2xl border border-electric/25 bg-electric/[0.12]">
          <Check size={28} aria-hidden="true" className="text-electric" />
        </div>
        <h3 className="m-0 font-display text-[21px] text-ink">Enquiry received</h3>
        <p className="mx-auto mt-2.5 max-w-[380px] text-[15px] leading-relaxed text-grey">
          Thank you. This is a demonstration form — no data has been transmitted. We respond to
          genuine enquiries via {SITE.email}.
        </p>
      </div>
    );
  }

  const errCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="relative overflow-hidden rounded-lg border border-glass-edge bg-glass-dark p-[clamp(22px,3vw,32px)] shadow-glass backdrop-blur-xl"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />

      {/* honeypot — visually hidden, off the tab order; real users never fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={fid("company-url")}>Company URL</label>
        <input
          id={fid("company-url")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => (honeypot.current = e.target.value)}
        />
      </div>

      {/* error summary — announced to assistive tech on submit */}
      {submitted && errCount > 0 && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-sm border border-danger/40 bg-danger/[0.08] px-4 py-3 text-[13.5px] text-ink"
        >
          <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-danger" />
          <span>Please correct the {errCount === 1 ? "highlighted field" : `${errCount} highlighted fields`} below.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <div>
          <FloatingField
            id={fid("first")}
            label="First Name"
            required
            error={errors.first}
            errId={fid("first-err")}
            data-err="first"
            value={form.first}
            onChange={set("first")}
            maxLength={LIMITS.first}
            autoComplete="given-name"
          />
          {errors.first && <FieldError id={fid("first-err")}>{errors.first}</FieldError>}
        </div>
        <div>
          <FloatingField
            id={fid("last")}
            label="Last Name"
            value={form.last}
            onChange={set("last")}
            maxLength={LIMITS.last}
            autoComplete="family-name"
          />
        </div>
        <div>
          <FloatingField
            id={fid("email")}
            label="Email"
            required
            error={errors.email}
            errId={fid("email-err")}
            data-err="email"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={set("email")}
            maxLength={LIMITS.email}
            autoComplete="email"
          />
          {errors.email && <FieldError id={fid("email-err")}>{errors.email}</FieldError>}
        </div>
        <div>
          <FloatingField
            id={fid("company")}
            label="Company Name"
            value={form.company}
            onChange={set("company")}
            maxLength={LIMITS.company}
            autoComplete="organization"
          />
        </div>
        <div>
          <FloatingField
            id={fid("phone")}
            label="Phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={set("phone")}
            maxLength={LIMITS.phone}
            autoComplete="tel"
          />
        </div>
        <div>
          <FloatingField
            id={fid("type")}
            label="Inquiry Type"
            select
            value={form.type}
            onChange={set("type")}
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-navy text-ink">
                {t}
              </option>
            ))}
          </FloatingField>
        </div>
        <div className="sm:col-span-2">
          <FloatingField
            id={fid("msg")}
            label="Message"
            required
            error={errors.message}
            errId={fid("msg-err")}
            data-err="message"
            textarea
            rows={5}
            value={form.message}
            onChange={set("message")}
            maxLength={LIMITS.message}
          />
          <div className="mt-1.5 flex items-center justify-between gap-3">
            {errors.message ? (
              <FieldError id={fid("msg-err")}>{errors.message}</FieldError>
            ) : (
              <span />
            )}
            <p className="text-right text-[11.5px] tabular-nums text-grey-dim">
              {form.message.length} / {LIMITS.message}
            </p>
          </div>
        </div>
      </div>

      <label
        htmlFor={fid("consent")}
        className="mt-4 flex items-start gap-3 text-[13.5px] leading-relaxed text-grey"
      >
        <input
          id={fid("consent")}
          data-err="consent"
          type="checkbox"
          checked={form.consent}
          onChange={set("consent")}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-electric)]"
          aria-required="true"
          aria-invalid={errors.consent ? "true" : undefined}
          aria-describedby={errors.consent ? fid("consent-err") : undefined}
        />
        <span>I agree to be contacted by Indus Gateway regarding my enquiry.</span>
      </label>
      {errors.consent && <FieldError id={fid("consent-err")}>{errors.consent}</FieldError>}

      <div className="mt-6">
        <Button type="submit" icon={Send}>Submit Enquiry</Button>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-grey-dim">
        <ShieldCheck size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-electric/70" />
        Do not submit confidential network credentials, passwords, or sensitive operational
        information. Demonstration form — no data is transmitted.
      </p>
    </form>
  );
}

/* Inline field error — token danger colour, announced via aria-describedby. */
function FieldError({ id, children }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[12.5px] text-danger">
      <AlertCircle size={13} aria-hidden="true" className="shrink-0" />
      {children}
    </p>
  );
}
