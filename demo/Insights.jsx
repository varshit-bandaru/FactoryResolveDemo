import { Button, Icon, Metrics, PageHeader, PanelHeading, Status } from "./ui";
export function History({ onBack }) {
  return (
    <>
      <PageHeader
        eyebrow="Maintenance / Equipment history"
        title="Conveyor CV-103"
        copy="Previous tickets help the department look for the cause, not just the symptom."
        action="Back to ticket"
        onAction={onBack}
      />
      <div className="history-banner">
        <Icon name="history" size={18} />
        <span>
          <strong>2 similar incidents found</strong>
          <small>Previous adjustments restored production temporarily.</small>
        </span>
        <Status tone="warning">Review root cause</Status>
      </div>
      <div className="app-panel history-panel">
        <PanelHeading kicker="RELATED TICKETS" title="What happened before" status={<span className="history-filter">Equipment: CV-103</span>} />
        <HistoryRow ticket="LU-1048" date="September 9" resolution="Investigation in progress" status="Current" tone="danger" />
        <HistoryRow ticket="LU-1014" date="August 28" resolution="Guide assembly tightened" status="Resolved" tone="success" />
        <HistoryRow ticket="LU-0981" date="August 19" resolution="Conveyor alignment adjusted" status="Resolved" tone="success" />
      </div>
      <div className="history-insight">
        <span>
          <Icon name="spark" size={17} />
        </span>
        <p>
          <strong>Pattern worth addressing</strong>Three vibration events point to a recurring equipment problem. The next update should capture the root cause
          and preventive action.
        </p>
      </div>
    </>
  );
}
function HistoryRow({ ticket, date, resolution, status, tone }) {
  return (
    <div className="history-row">
      <span>
        <strong>{ticket}</strong>
        <small>
          {date} <b>·</b> {resolution}
        </small>
      </span>
      <Status tone={tone}>{status}</Status>
      <b>{status === "Current" ? "—" : "18 min"}</b>
    </div>
  );
}
export function Analytics({ ticket }) {
  const bars = [
    ["Mechanical wear", 38, "teal"],
    ["Material shortage", 24, "orange"],
    ["Quality hold", 18, "lime"],
    ["Electrical fault", 12, "purple"],
    ["Other", 8, "muted"],
  ];
  return (
    <>
      <PageHeader eyebrow="Insights / Plant overview" title="Operational insight" copy="Closed tickets compound into better decisions for the next shift." />
      <Metrics
        className="analytics-metrics"
        items={[
          ["Open high-priority issues", "3", "↓ 2 from last month", "orange"],
          ["Average acknowledgement", "6 min", "↓ 18% faster", "teal"],
          ["Average resolution", "42 min", "↓ 11% faster", "lime"],
          ["Production downtime", "7.5 hrs", "this month", "purple"],
          ["Recurring equipment issues", "4", "needs attention", "danger"],
          ["Overdue issues", "5", "across 3 teams", "warning"],
        ]}
      />
      <div className="analytics-layout">
        <div className="app-panel analytics-chart">
          <PanelHeading kicker="DOWNTIME BY ROOT CAUSE" title="Where production is losing time" status={<span className="chart-range">Last 30 days</span>} />
          <div className="chart-bars">
            {bars.map(([label, value, tone]) => (
              <div className="chart-row" key={label}>
                <span>{label}</span>
                <div>
                  <i className={`chart-bar-${tone}`} style={{ width: `${value}%` }}></i>
                </div>
                <b>{value}%</b>
              </div>
            ))}
          </div>
        </div>
        <div className="app-panel analytics-insight">
          <span className="help-icon">
            <Icon name="spark" size={17} />
          </span>
          <span className="panel-kicker">PLANT SIGNAL</span>
          <h2>Assembly Hall needs attention.</h2>
          <p>Mechanical wear is the leading cause of downtime. CV-103 is now part of the equipment history, not another isolated ticket.</p>
          <span className="inline-link">
            Explore recurring assets <Icon name="arrow" size={14} />
          </span>
        </div>
      </div>
      {ticket.status === "resolved" && (
        <div className="analytics-note">
          <Icon name="check" size={15} />
          <span>
            <strong>LU-1048 added to operational history.</strong>
            <small>One resolved issue is now available for prevention and planning.</small>
          </span>
        </div>
      )}
    </>
  );
}
export function Privacy({ onPilot }) {
  const settings = [
    ["Deployment", "Customer-managed, on-premises", "Private"],
    ["Data location", "Pune Plant server", "Internal"],
    ["Network access", "Internal network only", "Protected"],
    ["External sharing", "Disabled", "Locked"],
    ["Role-based access", "Enabled", "Active"],
    ["Audit logging", "Enabled", "Active"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Administration / Deployment"
        title="Inside the customer boundary."
        copy="Operational data stays within the manufacturer’s own network."
      />
      <div className="privacy-intro">
        <span>
          <Icon name="lock" size={20} />
        </span>
        <div>
          <strong>Secure by deployment</strong>
          <p>Equipment photographs, production volumes, defects and internal processes never need to leave the company.</p>
        </div>
      </div>
      <div className="app-panel settings-panel">
        {settings.map(([label, value, state]) => (
          <div className="setting-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <Status tone="success">{state}</Status>
          </div>
        ))}
      </div>
      <div className="privacy-cta">
        <div>
          <span>
            <Icon name="check" size={17} />
          </span>
          <strong>One secure workflow from issue to insight.</strong>
        </div>
        <Button variant="primary" onClick={onPilot}>
          Request a pilot
        </Button>
      </div>
    </>
  );
}


