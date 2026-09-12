import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ContactFormStatus from "./ContactFormStatus";
import { services } from "./data";
import FormField from "./FormField";
import ServiceSelect from "./ServiceSelect";
import { useContactRequestForm } from "./useContactRequestForm";
import { contactHoneypotFieldName } from "./types";

type ContactRequestFormProps = {
  idPrefix: string;
  variant?: "home" | "page";
};

const variants = {
  home: {
    label: "text-sm font-semibold text-white",
    input:
      "border-white/10 bg-white/[0.03] text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:bg-white/[0.05]",
    field: "mt-2",
    textarea: "resize-none",
    submit: "py-4 font-bold shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20",
    status: "text-xs",
  },
  page: {
    label: "mb-2 block text-sm font-semibold text-gray-300",
    input:
      "border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 hover:border-white/20 focus:border-amber-500/60 focus:bg-white/[0.06]",
    field: "",
    textarea: "min-h-[140px] resize-y sm:min-h-[150px]",
    submit: "min-h-[54px] py-4 font-black hover:shadow-xl hover:shadow-amber-500/20",
    status: "text-sm",
  },
} as const;

export default function ContactRequestForm({
  idPrefix,
  variant = "home",
}: ContactRequestFormProps) {
  const {
    values,
    errors,
    status,
    statusMessage,
    updateValue,
    markTouched,
    handleSubmit,
  } = useContactRequestForm();
  const styles = variants[variant];
  const isSubmitting = status === "submitting";
  const inputClassName = (hasError: boolean, withIcon = false) =>
    `block w-full min-w-0 rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-amber-500/10 ${
      withIcon ? "pl-12" : ""
    } ${styles.input} ${hasError ? "border-red-400/80 focus:border-red-400" : ""} ${
      isSubmitting ? "cursor-wait opacity-60" : ""
    }`;
  const fieldId = (field: string) => `${idPrefix}-${field}`;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <input
          name={contactHoneypotFieldName}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore="true"
          data-lpignore="true"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <FormField id={fieldId("name")} label="Име" error={errors.name} className="min-w-0" labelClassName={styles.label}>
          <div className={`relative ${styles.field}`}>
            <UserIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-600" />
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              value={values.name}
              placeholder="Вашето име"
              autoComplete="name"
              maxLength={80}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
              onChange={(event) => updateValue("name", event.target.value)}
              onBlur={() => markTouched("name")}
              className={inputClassName(Boolean(errors.name), true)}
            />
          </div>
        </FormField>

        <FormField id={fieldId("phone")} label="Телефон" error={errors.phone} className="min-w-0" labelClassName={styles.label}>
          <div className={`relative ${styles.field}`}>
            <PhoneIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-600" />
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              value={values.phone}
              placeholder="088 335 689"
              autoComplete="tel"
              inputMode="tel"
              maxLength={20}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
              onChange={(event) => updateValue("phone", event.target.value)}
              onBlur={() => markTouched("phone")}
              className={inputClassName(Boolean(errors.phone), true)}
            />
          </div>
        </FormField>
      </div>

      <FormField id={fieldId("email")} label="Email" error={errors.email} className="min-w-0" labelClassName={styles.label}>
        <div className={`relative ${styles.field}`}>
          <EnvelopeIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-600" />
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            value={values.email}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={254}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
            onChange={(event) => updateValue("email", event.target.value)}
            onBlur={() => markTouched("email")}
            className={inputClassName(Boolean(errors.email), true)}
          />
        </div>
      </FormField>

      <FormField
        id={fieldId("service")}
        label={variant === "home" ? "Какво Ви е необходимо?" : "Услуга"}
        error={errors.service}
        className="min-w-0"
        labelClassName={styles.label}
      >
        <div className={styles.field}>
          <ServiceSelect
            id={fieldId("service")}
            value={values.service}
            options={services}
            disabled={isSubmitting}
            hasError={Boolean(errors.service)}
            describedBy={errors.service ? `${fieldId("service")}-error` : undefined}
            onChange={(value) => updateValue("service", value)}
            onBlur={() => markTouched("service")}
            className={`${inputClassName(Boolean(errors.service), true)} pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_28px_rgba(0,0,0,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_32px_rgba(0,0,0,0.18)]`}
          />
        </div>
      </FormField>

      <FormField
        id={fieldId("message")}
        label={variant === "home" ? "Разкажете ни повече" : "Съобщение"}
        error={errors.message}
        className="min-w-0"
        labelClassName={styles.label}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          value={values.message}
          placeholder="Разкажете ни накратко за вашия проект..."
          maxLength={2000}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined}
          onChange={(event) => updateValue("message", event.target.value)}
          onBlur={() => markTouched("message")}
          className={`mt-2 block w-full min-w-0 rounded-xl border px-4 py-3.5 text-sm leading-6 outline-none transition focus:ring-2 focus:ring-amber-500/10 ${styles.input} ${styles.textarea} ${
            errors.message ? "border-red-400/80 focus:border-red-400" : ""
          }`}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-500 px-6 text-sm text-gray-950 transition-all duration-300 hover:bg-amber-400 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 ${styles.submit}`}
      >
        {status === "submitting" ? "Изпращане..." : "Изпрати запитване"}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>

      <ContactFormStatus status={status} message={statusMessage} className={styles.status} />
      {status === "idle" && (
        <p className="text-center text-xs text-gray-600">
          Ако формата не е свързана със сървър, ще се отвори вашето email приложение.
        </p>
      )}
    </form>
  );
}
