import "./DashboardCard.css";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="dashboard-card">
      <div
        className="card-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="card-details">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;