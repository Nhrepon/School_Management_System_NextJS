import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-4xl">
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
