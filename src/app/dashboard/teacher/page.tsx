import { Class, Subject, Teacher } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import Pagination from "@/components/pagination"
import { ItemPerPage } from "@/lib/settings"

type TeacherWithRelations = Teacher & {
  subjects: Subject[]
  classes: Class[]
}


async function getTeachers(page: number = 1, itemsPerPage: number = 10) {
  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      orderBy: {
        name: 'asc'
      },
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    }),
    prisma.teacher.count()
  ]);

  return { teachers, total };
}

export default async function TeacherListPage({searchParams,}: {searchParams: { page?: string };}) {
  const currentPage = Number(searchParams.page) || 1;
  const { teachers, total } = await getTeachers(currentPage, ItemPerPage);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6">Teacher List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birthdate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher: TeacherWithRelations) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.userName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={teacher.image || '/noAvatar.png'} 
                    alt={teacher.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.subjects.map((subject: Subject) => subject.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.classes.map((cls: Class) => cls.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.bloodGroup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.sex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.birthDay ? new Date(teacher.birthDay).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not specified'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        totalItems={total} 
        itemsPerPage={ItemPerPage} 
        currentPage={currentPage}
      />
    </div>
  )
}