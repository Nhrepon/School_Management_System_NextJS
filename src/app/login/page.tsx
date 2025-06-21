import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="p-4">Login page</h2>
      <hr />
      <form className="flex flex-col gap-4 p-4 shadow-lg rounded-lg bg-white" action=""> 
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="p-2 border rounded bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer">Login</button>
      </form>
      <Link className="p-4" href="/dashboard">Dashboard</Link>
    </div>
  );
}
