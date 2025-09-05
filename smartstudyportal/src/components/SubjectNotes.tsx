
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Calendar, Eye, BookOpen, Home, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Note {
  id: string;
  title: string;
  description: string;
  url: string;
  uploadDate: string;
  type: string;
}

interface Syllabus {
  id: string;
  title: string;
  url: string;
  uploadDate: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  syllabus: Syllabus;
  notes: Note[];
}

interface SubjectNotesProps {
  subject: Subject;
  onBack: () => void;
  onBackToHome: () => void;
  studentData: {
    name: string;
    branch: string;
    year: string;
  };
}

const SubjectNotes = ({ subject, onBack, onBackToHome, studentData }: SubjectNotesProps) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'doc': return 'bg-blue-100 text-blue-700';
      case 'ppt': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Dynamically get last year papers from subject notes filtering by title or description
  const lastYearPapers = subject.notes.filter(note => {
    const titleDesc = (note.title + " " + note.description).toLowerCase();
    return titleDesc.includes("end semester examination") || titleDesc.includes("last year papers");
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">{subject.name}</h1>
              <p className="text-sm text-gray-600">{subject.code} • {studentData.name} • MLR Institute of Technology</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Subject Info */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{subject.name}</h2>
              <p className="text-lg text-gray-600 mb-2">{subject.description}</p>
              <div className="text-sm text-blue-600 font-medium">{subject.code}</div>
            </div>
            <Card className="ml-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Syllabus Available</h3>
                    <p className="text-sm text-green-600">Download official syllabus</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(subject.syllabus.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Syllabus
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Study Notes Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            Study Notes
          </h3>
          {subject.notes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subject.notes.filter(note => {
                const titleDesc = (note.title + " " + note.description).toLowerCase();
                return !titleDesc.includes("end semester examination") && !titleDesc.includes("last year papers");
              }).map((note) => (
                <Card 
                  key={note.id}
                  className="hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 leading-tight mb-2">
                          {note.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-3">
                          {note.description}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(note.type)}`}>
                          {note.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Uploaded {note.uploadDate}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => setSelectedNote(note)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
                          <DialogHeader>
                            <DialogTitle>{selectedNote?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <div className="bg-gray-100 p-8 rounded-lg text-center">
                              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-4">
                                This is a preview of "{selectedNote?.title}"
                              </p>
                              <p className="text-sm text-gray-500 mb-6">
                                {selectedNote?.description}
                              </p>
                              <Button 
                                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                                onClick={() => window.open(selectedNote?.url || '#', '_blank')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Full Document
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => window.open(note.url, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-0 bg-white/90 backdrop-blur-sm">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  No notes available
                </h4>
                <p className="text-gray-500">
                  Notes for {subject.name} will be uploaded soon.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Last Year Papers Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-purple-600" />
            Last Year Papers
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastYearPapers.map((paper) => (
              <Card 
                key={paper.id}
                className="hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm border-l-4 border-l-purple-500"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 leading-tight mb-2">
                        {paper.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-3">
                        {paper.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(paper.type)}`}>
                        {paper.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Uploaded {paper.uploadDate}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => window.open(paper.url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectNotes;
