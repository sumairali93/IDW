import { useState, useRef, useId } from "react";
import { Check, ArrowRight, AlertCircle } from "lucide-react";
import { SITE } from "../../config.js";

/*
 * LeadForm — compact, low-friction homepage lead capture. Three fields (name,
 * work email, requirement) so the ask feels natural, not forced. Matches the
 * premium notched-outline floating-label console used on the Contact and IPv4
 * forms: the label rests as the placeholder then rides up into a real gap in the
 * top border on focus/fill. Front-end only — validates name + a well-formed
 * email, hardens with a honeypot + input caps, shows a success state, and sends
 * nothing (no backend yet). All colours are token-driven; motion is CSS-only and
 * reduced-motion gated globally.
 */
const LIMITS = { name: 80, email: 120, need: 200 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FLOATED =
  "group-focus-within:top-0 group-focus-within:text-[11px] group-focus-within:font-medium " +
  "group-has-[.peer:not(:placeholder-shown)]:top-0 group-has-[.peer:not(:placeholder-shown)]:text-[11px] group-has-[.peer:not(:placeholder-shown)]:font-medium";

function FloatingField({ id, label, required, error, errId, ...rest }) {
  const labelColor = error
    ? "text-danger"
    : "text-grey-dim group-focus-within:text-electric group-has-[.peer:not(:placeholder-shown)]:text-electric";
  const borderColor = error ? "border-danger" : "border-line group-focus-within:border-electric";
  const text = `${label}${required ? " *" : ""}`;
  return (
    <div className="group relative">
      <input
        id={id}
        placeholder=" "
        className="peer w-full rounded-sm border-0 bg-navy-deep/60 px-[15px] py-3.5 text-[14.5px] text-ink outline-none placeholder:text-transparent"
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3.5 top-1/2 z-[2] -translate-y-1/2 text-[14.5px] transition-all duration-200 ${FLOATED} ${labelColor}`}
      >
        {text}
      </label>
      <fieldset aria-hidden="true" className={`field-fieldset ${borderColor}`}>
        <legend className="field-legend">
          <span>{text}</span>
        </legend>
      </fieldset>
    </div>
  );
}

const EMPTY = { name: "", email: "", need: "" };

function validate(form) {
  const e = {};
  if (!form.name.trim()) e.name = "Please enter your name.";
  if (!form.email.trim()) e.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Please enter a valid email address.";
  return e;
}

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const honeypot = useRef("");
  const formRef = useRef(null);
  const uid = useId();
  const fid = (k) => `${uid}-${k}`;

  const set = (k) => (e) => {
    const value = LIMITS[k] ? e.target.value.slice(0, LIMITS[k]) : e.target.value;
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
      const first = ["name", "email"].find((k) => eMap[k]);
      formRef.current?.querySelector(`[data-err="${first}"]`)?.focus();
      return;
    }
    // Placeholder submission only — no network request is made.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-glass-edge bg-glass-dark p-8 text-center shadow-glass backdrop-blur-xl sm:p-10">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-electric/25 bg-electric/[0.12]">
          <Check size={28} aria-hidden="true" className="text-electric" />
        </div>
        <h3 className="m-0 font-display text-[20px] text-ink">Thanks — we&rsquo;ll be in touch</h3>
        <p className="mx-auto mt-2.5 max-w-[360px] text-[14px] leading-relaxed text-grey">
          This is a demonstration form — no data has been transmitted. Reach us directly at{" "}
          {SITE.email}.
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
      className="relative overflow-hidden rounded-lg border border-glass-edge bg-glass-dark p-6 shadow-glass backdrop-blur-xl sm:p-8"
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

      <div className="mb-6 border-b border-line-soft pb-5">
        <h3 className="m-0 font-display text-[18px] font-semibold text-ink">
          Request a consultation
        </h3>
        <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-grey">
          A specialist responds within one business day.
        </p>
      </div>

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
            id={fid("name")}
            label="Name"
            required
            error={errors.name}
            errId={fid("name-err")}
            data-err="name"
            value={form.name}
            onChange={set("name")}
            maxLength={LIMITS.name}
            autoComplete="name"
          />
          {errors.name && <FieldError id={fid("name-err")}>{errors.name}</FieldError>}
        </div>
        <div>
          <FloatingField
            id={fid("email")}
            label="Work Email"
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
        <div className="sm:col-span-2">
          <FloatingField
            id={fid("need")}
            label="What do you need?"
            value={form.need}
            onChange={set("need")}
            maxLength={LIMITS.need}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill border border-electric bg-electric px-5 py-3 text-[14.5px] font-semibold tracking-tight text-navy-deep transition-shadow hover:shadow-glow sm:w-auto"
      >
        Request Consultation
        <ArrowRight
          size={17}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>

      <p className="mb-0 mt-4 text-[12px] leading-relaxed text-grey-dim">
        No spam. We&rsquo;ll only use your details to respond to this enquiry.
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
