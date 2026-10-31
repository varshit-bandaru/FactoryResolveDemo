
import { INCIDENT } from "./data";
import { Button, Icon, PageHeader, Status } from "./ui";
export function MaintenanceQueue({ ticket, onAssign, onOpen }) {
  return (
    <>
      <PageHeader
        eyebrow="Mechanical Maintenance / Department queue"
        title="Work waiting for your team."
        copy="Production-impacting issues rise to the top so the department can assign the right person."
      />
      <div className="queue-summary-bar">
        <span>
          <b>{ticket.status === "not-created" ? 0 : 1}</b> issue from Production
        </span>
        <span className="queue-filter">
          <Icon name="search" size={13} /> Search equipment or ticket
        </span>
        <span className="queue-filter active">
          Production impact <b>↓</b>
        </span>
      </div>
      {ticket.status === "not-created" ? (
        <div className="empty-queue">
          <span>
            <Icon name="check" size={20} />
          </span>
          <h2>No new production issues.</h2>
          <p>When Production reports a problem, it will appear here for department assignment.</p>
        </div>
      ) : (
        <div className="app-panel department-queue">
          <div className="queue-columns">
            <span>Issue</span>
            <span>Priority</span>
            <span>Impact</span>
            <span>Age</span>
            <span>Assigned to</span>
            <span></span>
          </div>
          <div className="queue-item queue-item-highlight">
            <span className="queue-issue">
              <i></i>
              <strong>{INCIDENT.ticket}</strong>
              <small>Conveyor CV-103 vibration causing scratches</small>
            </span>
            <Status tone="danger">High</Status>
            <span className="queue-value">Line stopped</span>
            <span className="queue-value">{ticket.status === "open" ? "3 min" : "22 min"}</span>
            <span className="queue-assignee">
              {ticket.assignee || "Unassigned"}
              {ticket.assignee && <small>Mechanical Maintenance</small>}
            </span>
            {ticket.status === "open" ? (
              <Button variant="small-primary" onClick={onAssign}>
                Assign
              </Button>
            ) : (
              <button className="round-arrow" type="button" onClick={onOpen} aria-label="Open LU-1048">
                <Icon name="arrow" size={14} />
              </button>
            )}
          </div>
          <div className="queue-item">
            <span className="queue-issue">
              <i className="marker-orange"></i>
              <strong>LU-1046</strong>
              <small>Hydraulic pressure low</small>
            </span>
            <Status tone="warning">Medium</Status>
            <span className="queue-value">Running</span>
            <span className="queue-value">18 min</span>
            <span className="queue-assignee">
              Hydraulics<small>Unassigned</small>
            </span>
            <span></span>
          </div>
          <div className="queue-item">
            <span className="queue-issue">
              <i className="marker-teal"></i>
              <strong>LU-1042</strong>
              <small>Guard inspection due</small>
            </span>
            <Status tone="neutral">Low</Status>
            <span className="queue-value">Running</span>
            <span className="queue-value">1 hr</span>
            <span className="queue-assignee">
              Safety<small>Priya Shah</small>
            </span>
            <span></span>
          </div>
        </div>
      )}
      <div className="queue-foot">
        <span>
          <i></i>Department view: Mechanical Maintenance
        </span>
        {ticket.assignee ? (
          <span className="queue-next-login">Next login: {ticket.assignee} · sign out to continue</span>
        ) : (
          <span>Sorted by production impact</span>
        )}
      </div>
    </>
  );
}