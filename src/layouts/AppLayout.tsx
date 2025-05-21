export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-fit bg-gray-50 text-gray-900">
      <div className="m-auto max-w-4xl w-full px-4">{children}</div>
    </div>
  );
}
