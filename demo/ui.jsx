const ICONS = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 3 2 4-6" />
    </>
  ),
  chat: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6a7.5 7.5 0 1 1 17-3.5Z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  dashboard: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h4M9 13h6M9 17h6" />
    </>
  ),
  history: (
    <>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 5v5h5" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M4 14h4l2 3h4l2-3h4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  logout: (
    <>
      <path d="M10 5H5v14h5" />
      <path d="M14 8l4 4-4 4M18 12H9" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m16 16 4 4" />
    </>
  ),
  spark: <path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6z" />,
  tools: (
    <>
      <path d="m14.5 6.5 3-3 3 3-3 3" />
      <path d="m17.5 6.5-6 6" />
      <path d="m5 19 4-4" />
      <path d="M4 20h5" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
};
export function Icon({ name, size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {ICONS[name] || ICONS.arrow}
    </svg>
  );
}
export function Avatar({ role, small = false }) {
  return <span className={`person-avatar avatar-${role.tone} ${small ? "person-avatar-small" : ""}`}>{role.initials}</span>;
}
export function Status({ children, tone = "neutral" }) {
  return (
    <span className={`status status-${tone}`}>
      <i></i>
      {children}
    </span>
  );
}
export function Button({ children, variant = "secondary", icon = "arrow", onClick, type = "button", disabled = false }) {
  return (
    <button className={`app-button app-button-${variant}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
      {icon && <Icon name={icon} size={15} />}
    </button>
  );
}
export function Field({ label, value, wide = false }) {
  return (
    <label className={wide ? "demo-field demo-field-wide" : "demo-field"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </label>
  );
}
export function Fields({ items }) {
  return (
    <div className="modal-fields">
      {items.map(([label, value, wide]) => (
        <Field key={label} label={label} value={value} wide={wide} />
      ))}
    </div>
  );
}
export function PageHeader({ eyebrow, title, copy, action, onAction }) {
  return (
    <div className="app-page-header">
      <div>
        <p className="app-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {action && (
        <Button variant="primary" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
export function PanelHeading({ kicker, title, status }) {
  return (
    <div className="panel-heading">
      <div>
        <span className="panel-kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {status}
    </div>
  );
}
export function Metrics({ className, items }) {
  return (
    <div className={className}>
      {items.map(([label, value, detail, tone = "teal"]) => (
        <div className={`app-metric metric-${tone}`} key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{detail}</small>
        </div>
      ))}
    </div>
  );
}
export function RouteStep({ label, value, person, done = false, active = false, last = false }) {
  return (
    <div className={`route-step ${done ? "is-done" : ""} ${active ? "is-active" : ""}`}>
      <i className="route-line"></i>
      <span className="route-dot">{done && <Icon name="check" size={11} />}</span>
      <div>
        <small>{label}</small>
        <strong>{person ? person.name : value || (active ? "Waiting for action" : "Not started")}</strong>
      </div>
      {!last && <Icon name="arrow" size={13} />}
    </div>
  );
}




