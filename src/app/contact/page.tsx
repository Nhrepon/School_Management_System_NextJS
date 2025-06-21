import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-4xl">
      <h2 className="p-4">Contact page</h2>
      <hr />
      <Link className="p-4" href="/dashboard">Dashboard</Link>
    </div>
  );
}
