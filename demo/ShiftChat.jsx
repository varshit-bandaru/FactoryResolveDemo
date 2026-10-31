"use client";

import { useState } from "react";
import { INCIDENT } from "./data";
import { Icon, PageHeader } from "./ui";

const FIRST_HANDOVER = [
  "Shift handover — LU-1048 | Resolved",
  "",
  "- Reported problem: Ravi Kumar reported excessive vibration on Conveyor CV-103, with visible scratches on 12 components from batch AC-0909-B17. Assembly Line 3 was stopped.",
  "- Assigned technician: Arjun Mehta, Mechanical Maintenance.",
  "- Root cause: Worn conveyor guide roller.",
  "- Repair: Arjun replaced the guide roller and realigned the conveyor, completing the work at 10:36 AM.",
  "- Final confirmation: Ravi confirmed the issue was resolved and closed the ticket at 10:45 AM.",
  "- Production status: Assembly Line 3 resumed operation at 10:46 AM.",
  "The repair evidence and complete activity history remain available in ticket LU-1048 for the next shift.",
].join("\n");

function getAnswer(question, ticket) {
  const asksForHandover = /\b(handover|hand.?off|next shift|shift summary|summary|pass.?on)\b/i.test(question);

  if (ticket.status === "not-created") {
    return asksForHandover
      ? "Handover — Assembly Line 3\nStatus: Running on Shift B.\nOpen issues: No active LU-1048 ticket in this workflow.\nNext shift: Continue routine monitoring and report any new equipment issue."
      : `Assembly Line 3 stopped after unusual vibration was reported at CV-103. Root cause: Worn conveyor guide roller. Fix: Replaced the guide roller and realigned the conveyor. Impact: ${INCIDENT.affectedQuantity} components from batch ${INCIDENT.batch} had surface scratches.`;
  }

  const resolved = ticket.status === "resolved";
  const repairComplete = ticket.status === "awaiting-reportee" || resolved;
  const status = resolved
    ? "Resolved; the line returned to production at 10:46 AM."
    : ticket.status === "awaiting-reportee"
      ? "Repair complete; awaiting Ravi's confirmation before closure."
      : ticket.status === "in-progress"
        ? `Work in progress${ticket.assignee ? ` with ${ticket.assignee}` : ""}.`
        : ticket.assignee
          ? `Assigned to ${ticket.assignee}.`
          : "Open; awaiting technician assignment.";
  const repairDetails = repairComplete
    ? `Root cause: ${ticket.rootCause || "Worn conveyor guide roller"}\nCorrective action: ${ticket.correctiveAction || "Replaced guide roller and realigned conveyor"}`
    : "Root cause: Not confirmed; Maintenance is investigating the vibration reported at CV-103.\nCorrective action: Inspection and repair are in progress.";

  if (asksForHandover) {
    const nextStep = resolved
      ? "Next shift: No further action is pending; review the ticket history if needed."
      : ticket.status === "awaiting-reportee"
        ? "Next shift: Follow up for Ravi's confirmation, then close the ticket."
        : "Next shift: Continue the repair, verify the conveyor, and update the ticket.";
    return `Handover — ${INCIDENT.line} · ${INCIDENT.shift}\nTicket: ${INCIDENT.ticket} · ${INCIDENT.equipment}\nStatus: ${status}\nImpact: ${INCIDENT.affectedQuantity} components from batch ${INCIDENT.batch} have surface scratches.${resolved ? " The line is back in production." : " The line remains stopped."}\n${repairDetails}\n${nextStep}`;
  }

  const lineStatus = resolved
    ? "Assembly Line 3 was stopped after unusual vibration was reported at CV-103; it is now back in production."
    : repairComplete
      ? "Assembly Line 3 was stopped after unusual vibration was reported at CV-103; the repair is complete and the line is awaiting confirmation."
      : "Assembly Line 3 was stopped after unusual vibration was reported at CV-103 and remains stopped while Maintenance investigates.";
  return `${lineStatus}\n${repairDetails}\nImpact: ${INCIDENT.affectedQuantity} components from batch ${INCIDENT.batch} have surface scratches.`;
}

export function ShiftChat({ ticket }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  function ask(question) {
    const text = question || draft.trim();
    if (!text) return;
    const answer = messages.length === 0 ? FIRST_HANDOVER : getAnswer(text, ticket);
    setMessages((current) => [...current, { question: text, answer }]);
    setDraft("");
  }

  return (
    <section className="shift-chat-page">
      <PageHeader
        eyebrow="Pune Plant / Assembly Line 3"
        title="Ask anything about your factory, from equipment issues to shift handovers."
      />
      <div className="shift-chat-layout">
        <div className="shift-chat-panel">
          <div className="shift-chat-head">
            <span className="shift-chat-avatar"><Icon name="spark" size={17} /></span>
            <span><strong>FactoryResolve</strong><small>Shift updates</small></span>
          </div>
          <div className="shift-chat-thread" aria-live="polite">
            {messages.map((message, index) => (
              <div className="shift-chat-exchange" key={`${index}-${message.question}`}>
                <p className="shift-chat-question">{message.question}</p>
                <div className="shift-chat-answer">
                  <span className="shift-chat-answer-mark"><Icon name="spark" size={13} /></span>
                  <div className="shift-chat-answer-text">
                    {message.answer.split("\n").map((line, lineIndex) => {
                      const separator = line.indexOf(":");
                      const label = separator >= 0 ? line.slice(0, separator + 1) : null;
                      const value = separator >= 0 ? line.slice(separator + 1).trim() : line;
                      const emphasizeValue = label === "Root cause:" || label === "Corrective action:";
                      return (
                        <span className="shift-chat-answer-line" key={lineIndex}>
                          {label && <strong>{label} </strong>}
                          {emphasizeValue ? <strong>{value}</strong> : value}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form
            className="shift-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              ask();
            }}>
            <label className="shift-chat-input-wrap">
              <span className="sr-only">Ask about the line or issue story</span>
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask a question..."
                maxLength={180}
              />
            </label>
            <button type="submit" aria-label="Send question" disabled={!draft.trim()}>
              <Icon name="arrow" size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
