import { ROLES, getTechnician } from "./data";
import { Avatar, Icon } from "./ui";
const LOGIN_CONTEXTS = {
  reportee: {
    workspace: "Production workspace",
    eyebrow: "STAGE 01 / REPORT",
    title: "Report the issue",
    description: "Create a ticket from the line and send it to the department that owns the next action.",
    roleHint: "Report from the line",
    accessNote: "You will start on the production dashboard.",
  },
  maintenanceLead: {
    workspace: "Maintenance workspace",
    eyebrow: "STAGE 02 / ROUTE",
    title: "Route the work",
    description: "Review the new production issue, assign the right technician and make the next owner clear.",
    roleHint: "Assign the right technician",
    accessNote: "You will land in the maintenance department queue.",
  },
  maintenance: {
    workspace: "Technician workspace",
    eyebrow: "STAGE 03 / REPAIR",
    title: "Repair and update",
    description: "Acknowledge the assigned work, record what changed and send the repair update back to Production.",
    roleHint: "Update and forward the work",
    accessNote: "You will land on your assigned ticket.",
  },
  reporteeConfirmation: {
    workspace: "Production workspace",
    eyebrow: "STAGE 04 / CONFIRM",
    title: "Confirm the resolution",
    description: "Review the technician update and close the ticket only when the issue is actually solved.",
    roleHint: "Confirm before closing",
    accessNote: "You will land in Ravi’s inbox with the repair update.",
  },
  resolved: {
    workspace: "Production workspace",
    eyebrow: "COMPLETE / HISTORY",
    title: "Resolution recorded",
    description: "The issue is closed and its ownership, evidence and outcome remain available for the next shift.",
    roleHint: "Review the completed record",
    accessNote: "You will see the closed ticket in the production workspace.",
  },
  quality: {
    workspace: "Quality workspace",
    eyebrow: "QUALITY / VERIFICATION",
    title: "Verify the outcome",
    description: "Follow the ticket context, inspect the evidence and confirm whether the result is ready to move forward.",
    roleHint: "Verify the result",
    accessNote: "You will see the plant ticket activity and history.",
  },
  supervisor: {
    workspace: "Operations workspace",
    eyebrow: "OPERATIONS / OVERSIGHT",
    title: "See the plant in motion",
    description: "Monitor ownership, downtime and recurring issues without interrupting the teams doing the work.",
    roleHint: "Monitor plant-wide flow",
    accessNote: "You will start with the plant insight view.",
  },
};
export function getNextLoginRoleId(ticketStatus) {
  if (ticketStatus === "open") return "maintenanceLead";
  if (ticketStatus === "assigned" || ticketStatus === "in-progress") return "maintenance";
  return "reportee";
}
function getLoginContext(roleId, ticketStatus) {
  if (roleId === "reportee" && ticketStatus === "awaiting-reportee") return LOGIN_CONTEXTS.reporteeConfirmation;
  if (roleId === "reportee" && ticketStatus === "resolved") return LOGIN_CONTEXTS.resolved;
  return LOGIN_CONTEXTS[roleId] || LOGIN_CONTEXTS.reportee;
}
export function LoginScreen({ ticketStatus, assignee, onLogin }) {
  const selectedRoleId = getNextLoginRoleId(ticketStatus);
  const selectedRole = selectedRoleId === "maintenance" ? getTechnician(assignee) : ROLES.find((role) => role.id === selectedRoleId) || ROLES[0];
  const context = getLoginContext(selectedRoleId, ticketStatus);
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(selectedRoleId);
  }
  return (
    <main className="login-screen">
      <div className="login-visual">
        <div className="login-orbit login-orbit-one"></div>
        <div className="login-orbit login-orbit-two"></div>
        <div className="login-brand">
          <span className="line-logo-mark">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>
            Factory<span>Resolve</span>
          </span>
        </div>
        <p className="login-kicker">
          <span></span> {context.eyebrow}
        </p>
        <h1>
          One incident.
          <br />
          <em>Every handoff.</em>
        </h1>
        <p>See how the same ticket changes hands—from the person who reports it to the team that verifies the result.</p>
      </div>
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-card-head">
          <span className="login-lock">
            <Icon name="lock" size={16} />
          </span>
          <div>
            <p className="app-eyebrow">{context.workspace}</p>
            <h2 id="login-title">{context.title}</h2>
          </div>
        </div>
        <p className="login-card-copy">{context.description}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <span>Next login in the route</span>
            <div className="login-account-preview">
              <Avatar role={selectedRole} />
              <span>
                <strong>{selectedRole.name}</strong>
                <small>
                  {selectedRole.title} · {selectedRole.department}
                </small>
              </span>
              <b>Ready</b>
            </div>
            <small>{context.roleHint}</small>
          </div>
          <label className="login-field" htmlFor="demo-email">
            <span>Work email</span>
            <input id="demo-email" type="email" value={selectedRole.email} readOnly autoComplete="username" />
          </label>
          <label className="login-field" htmlFor="demo-password">
            <span>Password</span>
            <input id="demo-password" type="password" value="factoryresolve" readOnly autoComplete="current-password" />
          </label>
          <div className="login-form-meta">
            <span>
              <i></i> Demo access enabled
            </span>
            <span>{context.workspace}</span>
          </div>
          <button className="app-button app-button-primary login-submit" type="submit">
            Continue as {selectedRole.name.split(" ")[0]} <Icon name="arrow" size={15} />
          </button>
        </form>
        <p className="login-demo-note" id="login-help">
          <Icon name="lock" size={13} />{" "}
          {selectedRoleId === "maintenance" ? `You will land on the ticket assigned to ${selectedRole.name.split(" ")[0]}.` : context.accessNote}
        </p>
        <span className="login-footnote">
          <i></i> Sample data only <b>·</b> no live plant connected
        </span>
      </section>
    </main>
  );
}