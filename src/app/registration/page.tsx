import Link from "next/link";

export default function Registration() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="p-4">Registration page</h2>
      <hr />
      <form className="flex flex-col gap-4 p-4 shadow-lg rounded-lg bg-white" action=""> 
      <input type="email" className="p-2 border rounded" placeholder="Email" />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" className="p-2 border rounded" placeholder="Username" />
          <input type="text" className="p-2 border rounded" placeholder="Name" />
          <input type="text" className="p-2 border rounded" placeholder="Phone" />
          <input type="text" className="p-2 border rounded" placeholder="Address" />
          <input type="text" className="p-2 border rounded" placeholder="City" />
          <input type="text" className="p-2 border rounded" placeholder="State" />
          <input type="text" className="p-2 border rounded" placeholder="Zip" />
          <input type="select" className="p-2 border rounded" placeholder="Country" />
          <input type="password" className="p-2 border rounded" placeholder="Password" />
        </div>
        
        <button type="submit" className="p-2 border rounded bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer">Register</button>
      </form>
      <Link className="p-4" href="/login">Login</Link>
    </div>
  );
}
