import SectionTitle from "../../components/common/SectionTitle";
import { teamMembers } from "../../data/siteData";

export default function Team() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Team"
        title="Meet our expert salon team"
        text="Experienced professionals dedicated to styling, beauty enhancement, and customer satisfaction."
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-2xl font-bold text-rose-600">
              {member.name.charAt(0)}
            </div>
            <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
            <p className="mt-1 text-slate-600">{member.role}</p>
            <p className="mt-2 text-sm text-rose-600">{member.exp}</p>
          </div>
        ))}
      </div>
    </section>
  );
}