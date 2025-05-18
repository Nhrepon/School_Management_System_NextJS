import { Class, Subject, Student } from "@prisma/client"
import { prisma } from "@/lib/prisma"

type StudentWithRelations = Student & {
  class: Class
  parent: {
    name: string
    mobile: string
  }
}

async function getStudents(): Promise<StudentWithRelations[]> {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      parent: {
        select: {
          name: true,
          mobile: true
        }
      }
    },
  })
  return students
}

export default async function StudentListPage() {
  const students = await getStudents()

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6">Student List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student: StudentWithRelations) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.userName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={student.image || '/noAvatar.png'} 
                    alt={student.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.class?.name || 'Not Assigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.birthDate ? new Date(student.birthDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not specified'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{student.parent.name}</div>
                  <div className="text-xs text-gray-400">{student.parent.mobile}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}