
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";

const Registration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    branch: "",
    year: ""
  });
  const navigate = useNavigate();

  const branches = [
    { value: "cse", label: "Computer Science Engineering (CSE)" },
    { value: "ece", label: "Electronics & Communication Engineering (ECE)" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "chemical", label: "Chemical Engineering" }
  ];

  const years = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentData.name && studentData.branch && studentData.year) {
      setIsRegistered(true);
    }
  };

  const handleBackToHome = () => {
    setIsRegistered(false);
    setStudentData({ name: "", branch: "", year: "" });
    navigate('/');
  };

  if (isRegistered) {
    return <Dashboard studentData={studentData} onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  NotesHub
                </h1>
                <p className="text-sm text-gray-600 font-medium">MLR Institute of Technology</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="h-4 w-4" />
              <span>Student Portal</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Registration Form */}
        <div className="max-w-lg mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Get Started
              </CardTitle>
              <p className="text-gray-600">Enter your details to access your personalized notes</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={studentData.name}
                    onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                    className="h-12 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <Select value={studentData.branch} onValueChange={(value) => setStudentData({...studentData, branch: value})}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {branches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <Select value={studentData.year} onValueChange={(value) => setStudentData({...studentData, year: value})}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium text-lg"
                >
                  Access My Notes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registration;
