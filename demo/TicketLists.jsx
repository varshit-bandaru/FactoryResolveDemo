import { INCIDENT, getTechnician } from "./data";
import { Button, Icon, Metrics, PageHeader, PanelHeading, Status } from "./ui";
export function Inbox({ ticket, onOpen }) {
  const awaiting = ticket.status === "awaiting-reportee";
  return (
    <>
      <PageHeader eyebrow="Production / My inbox" title="Your handoffs." copy="Updates that need your attention appear here." />
      <div className="inbox-card app-panel">
        <div className="inbox-card-head">
          <span className="inbox-count">
            <b>{awaiting ? 1 : 0}</b> Needs your attention
          </span>
          <span>
            Ravi Kumar <b>·</b> Production Operator
          </span>
        </div>
        {awaiting ? (
          <div className="inbox-item">
            <span className="inbox-item-icon">
              <Icon name="inbox" size={18} />
            </span>
            <div>
              <Status tone="warning">Maintenance update</Status>
              <h2>{INCIDENT.ticket}: Conveyor CV-103</h2>
              <p>{getTechnician(ticket.assignee).name} completed the repair and sent the ticket back to you for confirmation.</p>
              <div className="inbox-meta">
                <span>
                  Root cause <strong>Worn guide roller</strong>
                </span>
                <span>
                  Repair <strong>24 minutes</strong>
                </span>
              </div>
            </div>
            <Button variant="primary" onClick={onOpen}>
              Review & close
            </Button>
          </div>
        ) : (
          <div className="empty-inbox">
            <span>
              <Icon name="check" size={19} />
            </span>
            <h2>You’re all caught up.</h2>
            <p>When a department sends an update back to you, it will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
}
export function ActivityTimeline({ events }) {
  return (
    <div className="app-panel activity-panel">
      <PanelHeading kicker="ACTIVITY" title="Ticket timeline" status={<span className="event-count">{events.length} events</span>} />
      <div className="activity-list">
        {events.length === 0 ? (
          <div className="empty-activity">Create the ticket to start the activity history.</div>
        ) : (
          events.map((event) => (
            <div className="activity-row" key={`${event.time}-${event.title}`}>
              <time>{event.time}</time>
              <i className={`activity-dot activity-dot-${event.tone}`}></i>
              <span>
                <strong>{event.title}</strong>
                <small>{event.detail}</small>
              </span>
              <Icon name="check" size={13} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export function Activity({ ticket }) {
  return (
    <>
      <PageHeader
        eyebrow="Operations / Activity"
        title="The work leaves a trail."
        copy="Every status change, assignment and handoff is time-stamped in the incident record."
      />
      <Metrics
        className="activity-overview"
        items={[
          ["Ticket events", ticket.events.length, ticket.status === "not-created" ? "No ticket yet" : "LU-1048", "teal"],
          ["Current owner", ticket.assignee ? getTechnician(ticket.assignee).name.split(" ")[0] : "Dept.", "Mechanical Maintenance", "orange"],
          ["Audit status", ticket.status === "resolved" ? "Ready" : "Live", "Complete context", "lime"],
        ]}
      />
      <ActivityTimeline events={ticket.events} />
    </>
  );
}
export function AllTickets({ ticket, onOpen }) {
  return (
    <>
      <PageHeader eyebrow="Operations / All tickets" title="Plant-wide ticket view." copy="A shared record makes ownership visible across departments." />
      <div className="app-panel all-tickets">
        <div className="all-tickets-head">
          <span>All open and recent tickets</span>
          <span>
            <Icon name="search" size={13} /> Search
          </span>
        </div>
        <div className="all-ticket-row all-ticket-row-main">
          <span className="queue-issue">
            <i></i>
            <strong>{INCIDENT.ticket}</strong>
            <small>Conveyor CV-103 vibration causing surface scratches</small>
          </span>
          <Status tone={ticket.status === "resolved" ? "success" : ticket.status === "awaiting-reportee" ? "warning" : "danger"}>
            {ticket.status === "resolved" ? "Resolved" : "Active"}
          </Status>
          <span>{ticket.assignee || "Mechanical Maintenance"}</span>
          <Button variant="small-primary" onClick={onOpen}>
            Open ticket
          </Button>
        </div>
        <div className="all-ticket-row">
          <span className="queue-issue">
            <i className="marker-orange"></i>
            <strong>LU-1046</strong>
            <small>Hydraulic pressure low</small>
          </span>
          <Status tone="warning">Medium</Status>
          <span>Hydraulics</span>
          <span>Open</span>
        </div>
        <div className="all-ticket-row">
          <span className="queue-issue">
            <i className="marker-teal"></i>
            <strong>LU-1014</strong>
            <small>Guide assembly tightened</small>
          </span>
          <Status tone="success">Resolved</Status>
          <span>Maintenance</span>
          <span>Aug 28</span>
        </div>
      </div>
    </>
  );
}




