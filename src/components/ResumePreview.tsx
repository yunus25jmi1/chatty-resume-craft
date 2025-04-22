
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Download, Printer, Check } from "lucide-react";
import PDFGenerator from "./PDFGenerator";

interface ResumePreviewProps {
  resumeData: Record<string, string>;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 p-4 border-b">
        <h2 className="text-xl font-bold mb-3 md:mb-0">Resume Preview</h2>
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
        <Card className="p-6 bg-white shadow-md max-w-[210mm] mx-auto print:shadow-none print:border-none" id="resume-pdf" ref={resumeRef}>
          {/* Header/Contact Info */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold mb-2">{resumeData.name || "Your Name"}</h1>
            <div className="flex flex-wrap text-sm text-gray-600 gap-x-4">
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
              <h2 className="text-xl font-bold mb-2 text-gray-800">Professional Summary</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
          )}
          
          {/* Experience Section */}
          {(resumeData.jobTitle || resumeData.company) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">Experience</h2>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{resumeData.jobTitle || "Position"}</h3>
                  <div className="text-sm text-gray-600">
                    {resumeData.startDate || "Start Date"} - {resumeData.endDate || "End Date"}
                  </div>
                </div>
                <div className="text-gray-700 mb-1">{resumeData.company || "Company"}</div>
                <p className="text-sm text-gray-600">{resumeData.jobDescription || "Job description"}</p>
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {(resumeData.degree || resumeData.institution) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">Education</h2>
              <div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{resumeData.degree || "Degree"}</h3>
                  <div className="text-sm text-gray-600">{resumeData.gradYear || "Year"}</div>
                </div>
                <div className="text-gray-700">{resumeData.institution || "Institution"}</div>
              </div>
            </div>
          )}
          
          {/* Skills Section */}
          {resumeData.skills && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.split(",").map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
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
