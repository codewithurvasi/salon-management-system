import StatCard from "../StatCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <StatCard 
          key={item.id} 
          title={item.title} 
          value={item.value} 
          note={item.note}
          icon={item.icon}
          trend={item.trend}
          color={item.color}
        />
      ))}
    </div>
  );
}
