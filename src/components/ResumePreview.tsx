
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Printer } from "lucide-react";
import PDFGenerator from "./PDFGenerator";

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  jobDescription: string;
}

interface Education {
  degree: string;
  institution: string;
  gradYear: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
}

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 p-4 border-b border-white/10">
        <h2 className="text-xl font-bold mb-3 md:mb-0 text-gradient">Resume Preview</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <PDFGenerator resumeData={resumeData} resumeRef={resumeRef} />
          <Button 
            variant="outline"
            onClick={handlePrint}
            className="w-full md:w-auto"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 bg-card text-card-foreground shadow-md max-w-[210mm] mx-auto print:shadow-none print:border-none glass-morphism" id="resume-pdf" ref={resumeRef}>
          {/* Header/Contact Info */}
          <div className="border-b border-white/10 pb-4 mb-6">
            <h1 className="text-3xl font-bold mb-2 text-gradient">{resumeData.name || "Your Name"}</h1>
            <div className="flex flex-wrap text-sm text-gray-400 gap-x-4">
              {resumeData.email && (
                <div>Email: {resumeData.email}</div>
              )}
              {resumeData.phone && (
                <div>Phone: {resumeData.phone}</div>
              )}
            </div>
          </div>
          
          {/* Summary Section */}
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-gradient">Professional Summary</h2>
              <p className="text-gray-300">{resumeData.summary}</p>
            </div>
          )}
          
          {/* Experience Section */}
          {resumeData.experiences && resumeData.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gradient">Experience</h2>
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="mb-4 p-4 rounded-lg glass-morphism">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white">{exp.jobTitle}</h3>
                    <div className="text-sm text-gray-400">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <div className="text-gray-300 mb-1">{exp.company}</div>
                  <p className="text-sm text-gray-400">{exp.jobDescription}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Education Section */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gradient">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 rounded-lg glass-morphism">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <div className="text-sm text-gray-400">{edu.gradYear}</div>
                  </div>
                  <div className="text-gray-300">{edu.institution}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Skills Section */}
          {resumeData.skills && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-gradient">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.split(",").map((skill, index) => (
                  <span 
                    key={index} 
                    className="glass-morphism px-3 py-1 rounded-full text-sm text-gray-300"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
