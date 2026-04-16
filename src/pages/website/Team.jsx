import { useEffect, useState } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import { getAllStaff } from "../../api/dashboardApi";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await getAllStaff("", 1, 50);

      console.log("Team page staff response:", response);

      const staffList =
        response?.staff ||
        response?.data?.staff ||
        response?.data ||
        [];

      const activeStaff = Array.isArray(staffList)
        ? staffList.filter((member) => member.status === "Active")
        : [];

      setTeamMembers(activeStaff);
      setError("");
    } catch (err) {
      setError("Failed to load team members");
      console.error("Fetch team members error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Team"
        title="Meet our expert salon team"
        text="Experienced professionals dedicated to styling, beauty enhancement, and customer satisfaction."
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-rose-600"></div>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchTeamMembers}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">No team members available right now.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member._id || member.id}
              className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-2xl font-bold text-rose-600">
                {member?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {member.name || "Unnamed Staff"}
              </h3>

              <p className="mt-1 text-slate-600">
                {member.specialization || member.role || "Salon Expert"}
              </p>

              <p className="mt-2 text-sm text-rose-600">
                {member.experience
                  ? `${member.experience}+ Years`
                  : member.exp || "Experienced Professional"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}