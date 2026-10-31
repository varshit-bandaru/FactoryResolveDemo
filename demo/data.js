export const INCIDENT = {
  company: "Apex Auto Components",
  plant: "Pune Plant",
  line: "Assembly Line 3",
  shift: "Shift B",
  ticket: "LU-1048",
  equipment: "Conveyor CV-103",
  batch: "AC-0909-B17",
  affectedQuantity: 12,
};

export const ROLES = [
  {
    id: "reportee",
    name: "Ravi Kumar",
    department: "Production",
    title: "Production Operator",
    email: "ravi.kumar@factoryresolve.com",
    initials: "RK",
    tone: "orange",
  },
  {
    id: "maintenance",
    name: "Arjun Mehta",
    department: "Mechanical Maintenance",
    title: "Maintenance Technician",
    email: "arjun.mehta@factoryresolve.com",
    initials: "AM",
    tone: "teal",
  },
  {
    id: "quality",
    name: "Neha Rao",
    department: "Quality",
    title: "Quality Engineer",
    email: "neha.rao@factoryresolve.com",
    initials: "NR",
    tone: "lime",
  },
  {
    id: "supervisor",
    name: "Suresh Patil",
    department: "Production",
    title: "Production Supervisor",
    email: "suresh.patil@factoryresolve.com",
    initials: "SP",
    tone: "green",
  },
  {
    id: "maintenanceLead",
    name: "Maintenance Desk",
    department: "Mechanical Maintenance",
    title: "Department Coordinator",
    email: "maintenance@factoryresolve.com",
    initials: "MM",
    tone: "teal",
  },
];

export const TECHNICIANS = [
  { ...ROLES[1], recommended: true, recommendationReason: "Previously worked on similar CV-103 vibration issues." },
  { ...ROLES[1], id: "maintenance-vikram", name: "Vikram Singh", email: "vikram.singh@factoryresolve.com", initials: "VS" },
  { ...ROLES[1], id: "maintenance-aman", name: "Aman Patel", email: "aman.patel@factoryresolve.com", initials: "AP" },
];

export function getTechnician(name) {
  return TECHNICIANS.find((person) => person.name === name) || TECHNICIANS[0];
}

export const INITIAL_TICKET = {
  status: "not-created",
  assignee: null,
  department: "Mechanical Maintenance",
  qualityStatus: "Batch hold requested",
  rootCause: null,
  correctiveAction: null,
  events: [],
};