import { Subject, Teacher, Lesson } from "@prisma/client"
import { prisma } from "@/lib/prisma"

type SubjectWithDetails = Subject & {
  teachers: Teacher[]
  lessons: Lesson[]
}

async function getSubjects(): Promise<SubjectWithDetails[]> {
  const subjects = await prisma.subject.findMany({
    include: {
      teachers: true,
      lessons: true,
    },
  })
  return subjects
}

export default async function SubjectListPage() {
  const subjects = await getSubjects()

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subject List</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{subject.name}</h2>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                    {subject.teachers.length} Teachers
                  </span>
                  <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                    {subject.lessons.length} Lessons
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Teachers</h3>
                  <div className="flex flex-wrap gap-2">
                    {subject.teachers.map((teacher) => (
                      <span
                        key={teacher.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {teacher.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Schedule</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {subject.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                      >
                        <div className="font-medium">{lesson.day}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(lesson.startTime).toLocaleTimeString()} - {new Date(lesson.endTime).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Edit Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}