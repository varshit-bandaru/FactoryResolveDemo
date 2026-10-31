import { useState } from "react";
import { INCIDENT, TECHNICIANS, getTechnician } from "./data";
import { Avatar, Button, Fields, Icon } from "./ui";
function ActivityModal({ title, children, onClose, onSubmit, submitLabel }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
        <div className="modal-heading">
          <div>
            <span className="panel-kicker">FACTORYRESOLVE WORKSPACE</span>
            <h2 id="demo-modal-title">{title}</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        {children}
        <div className="modal-actions">
          <button className="modal-cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <Button variant="primary" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
export function CreateIssueModal({ onClose, onSubmit }) {
  return (
    <ActivityModal title="Report an issue" onClose={onClose} onSubmit={onSubmit} submitLabel="Create & route ticket">
      <div className="modal-copy">The form creates one shared record and routes it to the selected department.</div>
      <Fields
        items={[
          ["Title", "Conveyor CV-103 vibration causing surface scratches", true],
          ["Plant", INCIDENT.plant],
          ["Production line", INCIDENT.line],
          ["Equipment", INCIDENT.equipment],
          ["Priority", "High"],
          ["Production impact", "Line stopped"],
          ["Batch number", INCIDENT.batch],
          ["Affected quantity", "12 components"],
          ["Route to department", "Mechanical Maintenance", true],
        ]}
      />
      <label className="modal-description">
        <span>Description</span>
        <strong>
          Excessive vibration was noticed at approximately 10:10 AM. Twelve components have visible surface scratches and the line has been temporarily stopped.
        </strong>
      </label>
      <div className="modal-evidence">
        <Icon name="file" size={15} />
        <span>
          <strong>2 attachments ready</strong>
          <small>
            conveyor-vibration.jpg <b>·</b> damaged-components.jpg
          </small>
        </span>
      </div>
    </ActivityModal>
  );
}
export function AssignModal({ ticket, onClose, onSubmit }) {
  const [selectedId, setSelectedId] = useState(() => getTechnician(ticket?.assignee).id);
  const selected = TECHNICIANS.find((person) => person.id === selectedId);
  return (
    <ActivityModal
      title="Assign the department owner"
      onClose={onClose}
      onSubmit={() => onSubmit(selected)}
      submitLabel={`Assign & notify ${selected.name.split(" ")[0]}`}>
      <div className="modal-copy">Mechanical Maintenance owns the queue. Select the relevant person to inspect the equipment.</div>
      <div className="assignment-card" role="radiogroup" aria-labelledby="assignment-department">
        <span className="assignment-label" id="assignment-department">
          MECHANICAL MAINTENANCE
        </span>
        {TECHNICIANS.map((person) => (
          <label className={`assignment-person assignment-option${person.id === selectedId ? " is-selected" : ""}`} key={person.id}>
            <Avatar role={person} />
            <span>
              <span className="assignment-name">
                <strong>{person.name}</strong>
                {person.recommended && <span className="assignment-recommendation">Recommended</span>}
              </span>
              <small>
                Maintenance Technician <b>·</b> Mechanical
              </small>
              {person.recommendationReason && <small className="assignment-reason">{person.recommendationReason}</small>}
            </span>
            <span className="selected-check" aria-hidden="true">
              {person.id === selectedId && <Icon name="check" size={14} />}
            </span>
            <input
              className="assignment-radio"
              type="radio"
              name="technician"
              value={person.id}
              checked={person.id === selectedId}
              onChange={() => setSelectedId(person.id)}
            />
          </label>
        ))}
        <p>Select an available technician to inspect the equipment and own the repair.</p>
      </div>
    </ActivityModal>
  );
}
export function RepairModal({ onClose, onSubmit }) {
  return (
    <ActivityModal title="Add maintenance update" onClose={onClose} onSubmit={onSubmit} submitLabel="Send update to Ravi">
      <div className="modal-copy">Document what failed, what changed and what the reportee should confirm.</div>
      <Fields
        items={[
          ["Root cause", "Worn conveyor guide roller", true],
          ["Corrective action", "Replaced guide roller and realigned conveyor", true],
          ["Part used", "Guide roller GR-18"],
          ["Work started", "10:18 AM"],
          ["Work completed", "10:36 AM"],
          ["Recommendation", "Inspect every 500 operating hours", true],
        ]}
      />
      <div className="modal-evidence">
        <Icon name="file" size={15} />
        <span>
          <strong>completed-repair.jpg attached</strong>
          <small>
            Proof of work <b>·</b> Ready to forward to Ravi Kumar
          </small>
        </span>
      </div>
    </ActivityModal>
  );
}

