"use client";
import { useState } from "react";
import { INITIAL_TICKET, TECHNICIANS, getTechnician } from "./data";
import { Shell } from "./Shell";
import { LoginScreen } from "./LoginScreen";
import { Overview } from "./Overview";
import { MaintenanceQueue } from "./MaintenanceQueue";
import { Inbox, Activity, AllTickets } from "./TicketLists";
import { TicketDetail } from "./TicketDetail";
import { History, Analytics, Privacy } from "./Insights";
import { ShiftChat } from "./ShiftChat";
import { CreateIssueModal, AssignModal, RepairModal } from "./Modals";
import { Icon } from "./ui";
export function getLandingView(roleId, ticketStatus) {
  if (roleId === "maintenanceLead") return "queue";
  if (roleId === "maintenance") return ticketStatus === "not-created" || ticketStatus === "open" ? "queue" : "ticket";
  if (roleId === "quality") return ticketStatus === "not-created" ? "activity" : "tickets";
  if (roleId === "supervisor") return "analytics";
  return ticketStatus === "awaiting-reportee" ? "inbox" : "overview";
}
const VIEW_COMPONENTS = {
  overview: Overview,
  queue: MaintenanceQueue,
  inbox: Inbox,
  ticket: TicketDetail,
  history: History,
  activity: Activity,
  tickets: AllTickets,
  analytics: Analytics,
  settings: Privacy,
  chat: ShiftChat,
};
const MODAL_COMPONENTS = { create: CreateIssueModal, assign: AssignModal, repair: RepairModal };
export default function DemoFlow() {
  const [signedIn, setSignedIn] = useState(false);
  const [roleId, setRoleId] = useState("reportee");
  const [view, setView] = useState("overview");
  const [ticket, setTicket] = useState(INITIAL_TICKET);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  function updateTicket(changes, [time, title, detail, tone], message) {
    setTicket((current) => ({ ...current, ...changes, events: [...current.events, { time, title, detail, tone }] }));
    setToast(message);
  }
  function createTicket() {
    updateTicket(
      { status: "open" },
      ["10:12 AM", "Ticket created by Ravi Kumar", "Production Operator · Routed to Mechanical Maintenance", "created"],
      "LU-1048 created and routed to Mechanical Maintenance.",
    );
    setModal(null);
    setView("ticket");
  }
  function assignTicket(person = TECHNICIANS[0]) {
    updateTicket(
      { status: "assigned", assignee: person.name },
      ["10:14 AM", `Assigned to ${person.name}`, "Mechanical Maintenance · Department owner", "routed"],
      `${person.name} was assigned and notified.`,
    );
    setModal(null);
    setView("ticket");
  }
  function startWork() {
    updateTicket(
      { status: "in-progress" },
      ["10:17 AM", `${getTechnician(ticket.assignee).name.split(" ")[0]} acknowledged the ticket`, "Maintenance Technician · Work started", "work"],
      "Ownership confirmed. The ticket is now in progress.",
    );
  }
  function saveRepair() {
    updateTicket(
      { status: "awaiting-reportee", rootCause: "Worn conveyor guide roller", correctiveAction: "Replaced guide roller and realigned conveyor" },
      ["10:36 AM", `Repair completed by ${getTechnician(ticket.assignee).name}`, "Worn guide roller replaced · Update forwarded to Ravi Kumar", "repair"],
      "Repair update sent to Ravi Kumar for confirmation.",
    );
    setModal(null);
    setView("ticket");
  }
  function closeTicket() {
    updateTicket(
      { status: "resolved" },
      ["10:45 AM", "Ticket closed by Ravi Kumar", "Reportee confirmed issue solved · Line resumed at 10:46 AM", "closed"],
      "LU-1048 closed. The resolution is now part of the equipment history.",
    );
    setView("overview");
  }
  function openTicket() {
    setView("ticket");
  }
  function handleLogout() {
    setSignedIn(false);
    setModal(null);
    setToast("");
    setView("overview");
  }
  if (!signedIn)
    return (
      <LoginScreen
        ticketStatus={ticket.status}
        assignee={ticket.assignee}
        onLogin={(nextRoleId) => {
          setRoleId(nextRoleId);
          setSignedIn(true);
          setView(getLandingView(nextRoleId, ticket.status));
        }}
      />
    );
  const Screen = VIEW_COMPONENTS[view];
  const Modal = MODAL_COMPONENTS[modal];
  const submitModal = { create: createTicket, assign: assignTicket, repair: saveRepair }[modal];
  return (
    <main className="demo-root">
      <Shell roleId={roleId} view={view} onViewChange={setView} ticket={ticket} onLogout={handleLogout}>
        <div className="demo-view-shell">
          {Screen && (
            <Screen
              ticket={ticket}
              roleId={roleId}
              onCreate={() => setModal("create")}
              onOpen={openTicket}
              onLogout={handleLogout}
              onAssign={() => setModal("assign")}
              onStart={startWork}
              onRepair={() => setModal("repair")}
              onClose={closeTicket}
              onOpenHistory={() => setView("history")}
              onBack={openTicket}
              onPilot={() => setToast("Pilot request ready for varshit@factoryresolve.com.")}
              onChat={() => setView("chat")}
            />
          )}
        </div>
        {toast && (
          <div className="demo-toast" role="status">
            <span>
              <Icon name="check" size={14} />
              {toast}
            </span>
            <button type="button" onClick={() => setToast("")} aria-label="Dismiss notification">
              <Icon name="x" size={13} />
            </button>
          </div>
        )}
      </Shell>
      {Modal && <Modal ticket={ticket} onClose={() => setModal(null)} onSubmit={submitModal} />}
    </main>
  );
}
