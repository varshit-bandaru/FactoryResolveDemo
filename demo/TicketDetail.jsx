import { INCIDENT, ROLES, getTechnician } from "./data";
import { ActivityTimeline } from "./TicketLists";
import { Button, Field, Icon, PageHeader, PanelHeading, RouteStep, Status } from "./ui";
export function TicketDetail({ ticket, roleId, onAssign, onStart, onRepair, onClose, onOpenHistory }) {
  const reporteeView = roleId === "reportee";
  const maintenanceView = roleId === "maintenance";
  const resolved = ticket.status === "resolved";
  const awaiting = ticket.status === "awaiting-reportee";
  const nextAction = maintenanceView
    ? { open: ["Assign technician", onAssign], assigned: ["Acknowledge & start work", onStart], "in-progress": ["Add repair update", onRepair] }[ticket.status]
    : reporteeView && awaiting
      ? ["Confirm resolved & close ticket", onClose]
      : null;
  const action = nextAction && (
    <Button variant="primary" onClick={nextAction[1]}>
      {nextAction[0]}
    </Button>
  );
  return (
    <>
      <PageHeader
        eyebrow={`${INCIDENT.ticket} / Ticket detail`}
        title="Conveyor CV-103 vibration"
        copy="One shared record for the report, assignment, repair and final confirmation."
      />{" "}
      <div className="ticket-status-bar">
        <span>
          <Status tone={resolved ? "success" : awaiting ? "warning" : ticket.status === "in-progress" ? "teal" : "danger"}>
            {resolved
              ? "Resolved"
              : awaiting
                ? "Awaiting reportee confirmation"
                : ticket.status === "in-progress"
                  ? "In progress"
                  : ticket.status === "assigned"
                    ? "Assigned"
                    : "Open"}
          </Status>
          <Status tone="danger">Line stopped</Status>
        </span>
        <span>
          Created by Ravi Kumar <b>·</b> 10:12 AM
        </span>
      </div>
      <div className="ticket-detail-layout">
        <div className="ticket-detail-main">
          <div className="app-panel incident-card">
            <div className="incident-card-title">
              <div>
                <span className="panel-kicker">{INCIDENT.ticket}</span>
                <h2>Conveyor CV-103 vibration causing surface scratches</h2>
              </div>
              {action}
            </div>
            <p>
              Excessive vibration was noticed on {INCIDENT.equipment} at approximately 10:10 AM. Twelve components from batch {INCIDENT.batch} have visible
              surface scratches. The line has been temporarily stopped and the batch is awaiting quality inspection.
            </p>
            <div className="incident-facts">
              <Field label="Plant" value={INCIDENT.plant} />
              <Field label="Area" value="Assembly Hall" />
              <Field label="Production line" value={INCIDENT.line} />
              <Field label="Equipment" value={INCIDENT.equipment} />
              <Field label="Batch number" value={INCIDENT.batch} />
              <Field label="Affected quantity" value="12 components" />
            </div>
            <div className="incident-attachments">
              <span>
                <i></i> conveyor-vibration.jpg
              </span>
              <span>
                <i></i> damaged-components.jpg
              </span>
              {ticket.rootCause && (
                <span>
                  <i></i> completed-repair.jpg
                </span>
              )}
            </div>
          </div>
          <ActivityTimeline events={ticket.events} />
        </div>
        <aside className="ticket-detail-side">
          <div className="app-panel routing-card">
            <PanelHeading kicker="ROUTING & OWNERSHIP" title="Who has the ticket" />
            <RouteStep label="Reportee" person={ROLES[0]} done />
            <RouteStep label="Department" value="Mechanical Maintenance" done={Boolean(ticket.assignee)} active={!ticket.assignee} />
            <RouteStep
              label="Assigned person"
              person={ticket.assignee ? getTechnician(ticket.assignee) : null}
              done={Boolean(ticket.assignee)}
              active={ticket.status === "assigned" || ticket.status === "in-progress"}
            />
            <RouteStep
              label="Reportee confirmation"
              value={resolved ? "Confirmed by Ravi Kumar" : awaiting ? "Waiting for Ravi Kumar" : "After repair"}
              done={resolved}
              active={awaiting}
              last
            />
          </div>
          <div className="app-panel ticket-help-card">
            <span className="help-icon">
              <Icon name="spark" size={16} />
            </span>
            <span className="panel-kicker">HANDOFF RULE</span>
            <h3>
              {awaiting
                ? "The repair is back with the reportee."
                : maintenanceView
                  ? "Assign, repair, then send it back."
                  : "The department owns the next action."}
            </h3>
            <p>
              {awaiting
                ? "Only the person who reported the issue can confirm whether the line is safe to return."
                : "Every action keeps its owner, timestamp and evidence in the same ticket."}
            </p>
            {ticket.status === "open" && maintenanceView && (
              <button className="inline-link" type="button" onClick={onOpenHistory}>
                Review previous CV-103 incidents <Icon name="arrow" size={14} />
              </button>
            )}
          </div>
        </aside>
      </div>
      {awaiting && maintenanceView && (
        <div className="confirmation-callout">
          <Icon name="check" size={18} />
          <span>
            <strong>Update forwarded to Ravi Kumar.</strong>
            <small>Log out, then sign in as Ravi Kumar to review and close the ticket.</small>
          </span>
        </div>
      )}
      {awaiting && reporteeView && (
        <div className="confirmation-callout">
          <Icon name="check" size={18} />
          <span>
            <strong>Maintenance completed the repair.</strong>
            <small>Review the update, then close the ticket if the issue is solved.</small>
          </span>
          {action}
        </div>
      )}
      {resolved && (
        <div className="resolved-strip">
          <Icon name="check" size={17} />
          <span>
            <strong>Closed by Ravi Kumar at 10:45 AM.</strong>
            <small>Line resumed at 10:46 AM after reportee confirmation.</small>
          </span>
        </div>
      )}
    </>
  );
}


