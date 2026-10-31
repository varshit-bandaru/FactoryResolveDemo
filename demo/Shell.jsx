import { INCIDENT, ROLES, getTechnician } from "./data";
import { Avatar, Icon } from "./ui";

export function Shell({ roleId, view, onViewChange, ticket, onLogout, children }) {
  const role = roleId === "maintenance" ? getTechnician(ticket.assignee) : ROLES.find((person) => person.id === roleId) || ROLES[0];
  const navItems = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "inbox", label: "My inbox", icon: "inbox" },
    { id: "queue", label: "Department queue", icon: "tools" },
    { id: "tickets", label: "All tickets", icon: "file" },
    { id: "activity", label: "Activity", icon: "history" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "chat", label: "Factory AI", icon: "chat" },
  ];
  const activeView = view === "ticket" ? (roleId === "maintenance" ? "queue" : roleId === "reportee" ? "inbox" : "tickets") : view;
  return (
    <div className="line-app-shell">
      <aside className="line-rail">
        <div className="line-logo">
          <span className="line-logo-mark">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>
            Factory<span>Resolve</span>
          </span>
        </div>
        <span className="line-workspace-label">APEX AUTO COMPONENTS</span>
        <nav aria-label="Application navigation">
          {navItems.map((item) => (
            <button className={activeView === item.id ? "is-active" : ""} type="button" key={item.id} onClick={() => onViewChange(item.id)}>
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
              {item.id === "inbox" && ticket.status === "awaiting-reportee" && roleId === "reportee" && <b>1</b>}
            </button>
          ))}
        </nav>
        <div className="line-rail-footer">
          <Avatar role={role} small />
          <span>
            <strong>{role.name}</strong>
            <small>{role.department}</small>
          </span>
        </div>
      </aside>
      <div className="line-workspace">
        <header className="line-topbar">
          <div className="line-location">
            <span className="mobile-line-mark">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>
              <strong>{INCIDENT.plant}</strong>
              <span>
                {INCIDENT.line} <b>·</b> {INCIDENT.shift}
              </span>
            </span>
          </div>
          <div className="line-topbar-actions">
            <span className="internal-chip">
              <Icon name="lock" size={12} /> Internal network
            </span>
            <button className="topbar-logout-button" type="button" onClick={onLogout}>
              <Icon name="logout" size={14} />
              Log out
            </button>
            <Avatar role={role} small />
          </div>
        </header>
        <div className="line-content">{children}</div>
      </div>
    </div>
  );
}