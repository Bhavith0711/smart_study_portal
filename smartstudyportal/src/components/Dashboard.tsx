
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Download, ArrowLeft, User, GraduationCap, Home } from "lucide-react";
import { notesData } from "@/data/notesData";
import SubjectNotes from "./SubjectNotes";

interface StudentData {
  name: string;
  branch: string;
  year: string;
}

interface DashboardProps {
  studentData: StudentData;
  onBackToHome: () => void;
}

const Dashboard = ({ studentData, onBackToHome }: DashboardProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const branchLabels: Record<string, string> = {
    cse: "Computer Science Engineering",
    ece: "Electronics & Communication Engineering", 
    mechanical: "Mechanical Engineering",
    civil: "Civil Engineering",
    electrical: "Electrical Engineering",
    chemical: "Chemical Engineering"
  };

  const subjects = notesData[studentData.branch]?.[studentData.year] || [];

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    return (
      <SubjectNotes 
        subject={subject!} 
        onBack={() => setSelectedSubject(null)}
        studentData={studentData}
        onBackToHome={onBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBackToHome}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    NotesHub
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">MLR Institute of Technology</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{studentData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>{studentData.year}st Year</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back, {studentData.name}! 👋
          </h2>
          <p className="text-xl text-gray-600">
            Here are your subjects for {branchLabels[studentData.branch]} - Year {studentData.year}
          </p>
        </div>

        {/* Subjects Grid */}
        {subjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card 
                key={subject.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:scale-105"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 leading-tight mb-2">
                        {subject.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-3">
                        {subject.description}
                      </p>
                      <div className="text-xs text-blue-600 font-medium">
                        {subject.code}
                      </div>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{subject.notes.length} Notes</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 border-0 bg-white/90 backdrop-blur-sm">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No subjects found
              </h3>
              <p className="text-gray-500">
                Notes for {branchLabels[studentData.branch]} Year {studentData.year} will be available soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
