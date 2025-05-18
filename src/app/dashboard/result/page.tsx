import { Result, Student, Subject, Exam } from "@prisma/client"
import { prisma } from "@/lib/prisma"

type ResultWithDetails = Result & {
  student: Student
  exam: (Exam & {
    lesson: {
      subject: Subject
    }
  }) | null
}

async function getResults(): Promise<ResultWithDetails[]> {
  const results = await prisma.result.findMany({
    include: {
      student: true,
      exam: {
        include: {
          lesson: {
            include: {
              subject: true
            }
          }
        }
      }
    },
    orderBy: {
      exam: {
        startTime: 'desc'
      }
    },
    take: 50 // Limit to last 50 records
  })
  return results
}

export default async function ResultPage() {
  const results = await getResults()

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam Results</h1>
        <div className="flex space-x-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Exams</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Classes</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Result
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={result.student.image || '/noAvatar.png'}
                        alt={result.student.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{result.student.name}</div>
                        <div className="text-sm text-gray-500">{result.student.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.exam?.title || 'N/A'}</div>
                    <div className="text-sm text-gray-500">
                      {result.exam ? new Date(result.exam.startTime).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.exam?.lesson.subject.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.score}</div>
                    <div className="text-xs text-gray-500">out of 100</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.score >= 90 ? 'bg-green-100 text-green-800' :
                      result.score >= 80 ? 'bg-blue-100 text-blue-800' :
                      result.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.score >= 90 ? 'A' :
                       result.score >= 80 ? 'B' :
                       result.score >= 70 ? 'C' : 'F'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.score >= 70 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.score >= 70 ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}