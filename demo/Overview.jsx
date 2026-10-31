import { INCIDENT, ROLES, getTechnician } from "./data";
import { Avatar, Button, Icon, Metrics, PageHeader, PanelHeading, RouteStep, Status } from "./ui";
export function Overview({ ticket, roleId, onCreate, onOpen, onLogout, onChat }) {
  if (ticket.status === "not-created") {
    return (
      <>
        <PageHeader
          eyebrow="Production / Shift B"
          title="Good morning, Ravi."
          copy="Capture an issue once and keep the whole plant in the loop."
          action="Report an issue"
          onAction={onCreate}
        />
        <div className="overview-context">
          <span>
            <b>{INCIDENT.plant}</b> <i>·</i> {INCIDENT.line}
          </span>
          <Status tone="success">Running</Status>
          <span>Updated just now</span>
        </div>
        <Metrics
          className="overview-metrics"
          items={[
            ["Line status", "Running", "Assembly Line 3", "success"],
            ["Open issues", "2", "1 high priority", "orange"],
            ["Shift output", "184", "components today", "teal"],
            ["Current downtime", "0m", "this shift", "lime"],
          ]}
        />
        <div className="overview-grid">
          <div className="app-panel line-card">
            <PanelHeading kicker="LINE STATUS" title="Assembly Line 3" status={<Status tone="success">Live</Status>} />
            <div className="line-diagram">
              <div className="line-belt">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <span></span>
              </div>
              <div className="line-conveyor">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <div className="fact-grid">
              <span>
                <small>Equipment</small>
                <strong>CV-103 / Conveyor</strong>
              </span>
              <span>
                <small>Batch running</small>
                <strong>AC-0909-B17</strong>
              </span>
              <span>
                <small>Last inspection</small>
                <strong>09:40 AM</strong>
              </span>
            </div>
          </div>
          <div className="app-panel start-card">
            <span className="start-icon">
              <Icon name="plus" size={21} />
            </span>
            <span className="panel-kicker">SEE SOMETHING?</span>
            <h2>Report it where work already happens.</h2>
            <p>Give Maintenance the line, equipment and evidence they need to respond.</p>
            <Button variant="primary" onClick={onCreate}>
              Report an issue
            </Button>
          </div>
        </div>
        <button className="shift-story-launch" type="button" onClick={onChat}>
          <span className="shift-story-mark">
            <Icon name="spark" size={18} />
          </span>
          <span className="shift-story-copy">
            <small>FACTORY AI</small>
            <strong>Get quick answers about your factory.</strong>
            <span>Ask about equipment, production, or shift handovers.</span>
          </span>
          <span className="shift-story-link">Open Factory AI <Icon name="arrow" size={15} /></span>
        </button>
      </>
    );
  }
  const awaiting = ticket.status === "awaiting-reportee";
  const resolved = ticket.status === "resolved";
  return (
    <>
      <PageHeader
        eyebrow="Production / My reported issues"
        title={resolved ? "The issue is closed." : awaiting ? "A repair update is ready." : "Your issue is moving."}
        copy={resolved ? "The line is back in production with a complete record." : "The same ticket keeps Production, Maintenance and Quality aligned."}
        action={awaiting ? "Review update" : "Open ticket"}
        onAction={onOpen}
      />
      <div className={`handoff-banner ${awaiting ? "handoff-banner-awaiting" : resolved ? "handoff-banner-resolved" : ""}`}>
        <span className="handoff-icon">
          <Icon name={resolved ? "check" : awaiting ? "inbox" : "arrow"} size={19} />
        </span>
        <div>
          <span className="panel-kicker">{resolved ? "RESOLVED" : awaiting ? "ACTION NEEDED FROM YOU" : "ROUTED TO DEPARTMENT"}</span>
          <strong>
            {resolved
              ? "Line safely returned to production"
              : awaiting
                ? "Maintenance sent an update for your confirmation"
                : ticket.assignee
                  ? `${ticket.assignee} is working on the issue`
                  : "Mechanical Maintenance has received the issue"}
          </strong>
          <small>
            {INCIDENT.ticket} <b>·</b> {INCIDENT.equipment} <b>·</b> {INCIDENT.line}
          </small>
        </div>
        <Status tone={resolved ? "success" : awaiting ? "warning" : "danger"}>
          {resolved ? "Closed" : awaiting ? "Needs confirmation" : ticket.status === "in-progress" ? "In progress" : "Open"}
        </Status>
      </div>
      <Metrics
        className="overview-metrics"
        items={[
          ["Ticket", INCIDENT.ticket, "Reported 10:12 AM", "teal"],
          ["Department", "Maintenance", ticket.assignee ? `Assigned to ${ticket.assignee}` : "Awaiting assignment", "orange"],
          ["Affected quantity", "12", "components on hold", "lime"],
          ["Line status", resolved ? "Running" : "Stopped", resolved ? "Resumed 10:46 AM" : "Awaiting resolution", resolved ? "success" : "danger"],
        ]}
      />
      <div className="overview-grid">
        <div className="app-panel ticket-summary-card">
          <PanelHeading
            kicker="CURRENT TICKET"
            title="Conveyor CV-103 vibration"
            status={
              <Status tone={resolved ? "success" : awaiting ? "warning" : "danger"}>
                {resolved ? "Resolved" : awaiting ? "Awaiting confirmation" : "Open"}
              </Status>
            }
          />
          <p>Excessive vibration was noticed at approximately 10:10 AM. Twelve components from batch {INCIDENT.batch} have visible surface scratches.</p>
          <div className="ticket-summary-route">
            <RouteStep label="Reported" done />
            <RouteStep label="Assigned" done={Boolean(ticket.assignee)} active={!ticket.assignee} />
            <RouteStep label="Repaired" done={Boolean(ticket.rootCause)} active={ticket.status === "in-progress"} />
            <RouteStep label="Confirmed" done={resolved} active={awaiting} />
          </div>
          <button className="shift-story-launch" type="button" onClick={onChat}>
            <span className="shift-story-mark">
              <Icon name="spark" size={18} />
            </span>
            <span className="shift-story-copy">
              <small>FACTORY AI</small>
              <strong>Get quick answers about your factory.</strong>
              <span>Ask about equipment, production, or shift handovers.</span>
            </span>
            <span className="shift-story-link">Open Factory AI <Icon name="arrow" size={15} /></span>
          </button>
          <button className="inline-link" type="button" onClick={onOpen}>
            Open full ticket <Icon name="arrow" size={14} />
          </button>
        </div>
        <div className="app-panel people-card">
          <PanelHeading kicker="PEOPLE ON THIS TICKET" title="The handoff is visible" />
          <PersonRow role={ROLES[0]} label="Reportee" />
          {ticket.assignee ? <PersonRow role={getTechnician(ticket.assignee)} label="Assigned technician" /> : <DepartmentRow />}
          {ticket.rootCause && <PersonRow role={ROLES[2]} label="Quality review" />}
        </div>
      </div>
      {roleId === "reportee" && !resolved && (
        <div className="overview-next">
          <span>
            <Icon name="spark" size={16} />
            Next step
          </span>
          <strong>{awaiting ? "Confirm whether the issue is solved." : "Maintenance will assign a technician and update the ticket."}</strong>
          {awaiting ? <Button onClick={onOpen}>Review maintenance update</Button> : <Button onClick={onLogout}>Log out to continue</Button>}
        </div>
      )}
    </>
  );
}
function PersonRow({ role, label, muted = false }) {
  return (
    <div className={`person-row ${muted ? "person-row-muted" : ""}`}>
      <Avatar role={role} small />
      <span>
        <strong>{role.name}</strong>
        <small>{label}</small>
      </span>
      {!muted && <Status tone="success">On ticket</Status>}
    </div>
  );
}
function DepartmentRow() {
  return (
    <div className="person-row person-row-muted">
      <span className="person-avatar person-avatar-small avatar-teal">MM</span>
      <span>
        <strong>Mechanical Maintenance</strong>
        <small>Department queue</small>
      </span>
      <Status tone="warning">Awaiting assignment</Status>
    </div>
  );
}