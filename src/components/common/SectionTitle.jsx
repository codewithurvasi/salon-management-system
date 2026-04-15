export default function SectionTitle({ tag, title, text }) {
  return (
    <div className="mb-10 text-center">
      {tag && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600">
          {tag}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mx-auto mt-4 max-w-2xl text-slate-600">{text}</p>}
    </div>
  );
}