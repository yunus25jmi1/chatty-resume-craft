
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, User, Loader2, Plus } from "lucide-react";

// Define the message types
type MessageType = "user" | "system" | "error" | "form";
type FormFieldType = "text" | "textarea" | "options";

// Define the form field interface
interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

// Define the message interface
interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  formFields?: FormField[];
}

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

interface ChatInterfaceProps {
  onDataCollected: (data: ResumeData) => void;
}

// Define step interface
interface Step {
  id: string;
  question: string;
  formField?: { type: FormFieldType };
  formFields?: FormField[];
}

const ChatInterface = ({ onDataCollected }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: "Welcome to ChattyResume! Let's build your professional resume together. What's your full name?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experiences: [],
    education: [],
    skills: "",
  });

  // Updated steps array
  const steps: Step[] = [
    { id: "name", question: "What's your full name?" },
    { id: "email", question: "What's your email address?" },
    { id: "phone", question: "What's your phone number?" },
    { id: "summary", question: "Please provide a brief professional summary about yourself.", formField: { type: "textarea" as FormFieldType } },
    { 
      id: "experience", 
      question: "Let's add your work experience. You can add multiple entries.",
      formFields: [
        { id: "jobTitle", type: "text" as FormFieldType, label: "Job Title", placeholder: "e.g., Senior Developer", required: true },
        { id: "company", type: "text" as FormFieldType, label: "Company", placeholder: "e.g., Acme Inc.", required: true },
        { id: "startDate", type: "text" as FormFieldType, label: "Start Date", placeholder: "e.g., Jan 2020", required: true },
        { id: "endDate", type: "text" as FormFieldType, label: "End Date", placeholder: "e.g., Present", required: true },
        { id: "jobDescription", type: "textarea" as FormFieldType, label: "Description", placeholder: "Describe your responsibilities and achievements", required: true },
      ]
    },
    { 
      id: "education", 
      question: "Now, let's add your education details. You can add multiple entries.",
      formFields: [
        { id: "degree", type: "text" as FormFieldType, label: "Degree", placeholder: "e.g., Bachelor of Science", required: true },
        { id: "institution", type: "text" as FormFieldType, label: "Institution", placeholder: "e.g., Stanford University", required: true },
        { id: "gradYear", type: "text" as FormFieldType, label: "Graduation Year", placeholder: "e.g., 2018", required: true },
      ]
    },
    { 
      id: "skills", 
      question: "What are your top skills? (Separate with commas)",
      formField: { type: "textarea" as FormFieldType }
    },
    {
      id: "finish",
      question: "Great! I have all the information needed to create your resume. Click 'Generate Resume' to proceed."
    }
  ];

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Show the generate button when we're at the final step
    if (currentStep === steps.length - 1) {
      setShowGenerateButton(true);
    } else {
      setShowGenerateButton(false);
    }
  }, [currentStep, steps.length]);

  const addMessage = (content: string, type: MessageType = "user", formFields?: FormField[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
      ...(formFields && { formFields }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!input.trim() && currentStep < steps.length) return;
    
    // Add user message
    addMessage(input);
    setInput("");
    
    // Save form data from the current step
    if (currentStep < steps.length) {
      const stepId = steps[currentStep].id;
      setFormData((prev) => ({ ...prev, [stepId]: input }));
    }
    
    setLoading(true);
    
    // Simulate processing (would be Gemini API call in production)
    setTimeout(() => {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      if (nextStep < steps.length) {
        // Add next question as system message
        const nextQuestion = steps[nextStep];
        
        if (nextQuestion.formFields) {
          addMessage(nextQuestion.question, "form", nextQuestion.formFields);
        } else if (nextQuestion.formField) {
          addMessage(nextQuestion.question, "form", [{ 
            id: nextQuestion.id, 
            type: nextQuestion.formField.type, 
            label: nextQuestion.question 
          }]);
        } else {
          addMessage(nextQuestion.question, "system");
        }
      } else {
        // All steps complete, call the callback with collected data
        addMessage("Your resume is ready! You can now preview and download it.", "system");
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleFormSubmit = (formValues: Record<string, string>) => {
    const stepId = steps[currentStep].id;
    
    if (stepId === "experience") {
      setFormData(prev => ({
        ...prev,
        experiences: [...prev.experiences, formValues as unknown as Experience]
      }));
    } else if (stepId === "education") {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, formValues as unknown as Education]
      }));
    } else {
      setFormData(prev => ({ ...prev, [stepId]: formValues[stepId] }));
    }

    // Add message to chat
    const formattedValues = Object.entries(formValues)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    
    addMessage(formattedValues);

    // Don't advance to next step for experience and education
    if (stepId === "experience" || stepId === "education") {
      addMessage("Would you like to add another entry? Click the '+' button or continue to the next section.", "system");
    } else {
      setLoading(true);
    
      // Simulate processing
      setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        if (nextStep < steps.length) {
          // Add next question as system message
          const nextQuestion = steps[nextStep];
          
          if (nextQuestion.formFields) {
            addMessage(nextQuestion.question, "form", nextQuestion.formFields);
          } else if (nextQuestion.formField) {
            addMessage(nextQuestion.question, "form", [{ 
              id: nextQuestion.id, 
              type: nextQuestion.formField.type, 
              label: nextQuestion.question 
            }]);
          } else {
            addMessage(nextQuestion.question, "system");
          }
        } else {
          // All steps complete, call the callback with collected data
          addMessage("Your resume is ready! You can now preview and download it.", "system");
        }
        
        setLoading(false);
      }, 1000);
    }
  };

  const FormComponent = ({ fields }: { fields: FormField[] }) => {
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleFormSubmit(formValues);
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                className="w-full bg-slate-800 border-gray-700 text-white"
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              />
            ) : field.type === "options" && field.options ? (
              <select
                id={field.id}
                className="w-full p-2 border rounded bg-slate-800 border-gray-700 text-white"
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-slate-800 border-gray-700 text-white"
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
            {steps[currentStep].id === "experience" || steps[currentStep].id === "education" ? "Add Entry" : "Submit"}
          </Button>
          {(steps[currentStep].id === "experience" || steps[currentStep].id === "education") && (
            <Button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              variant="outline"
              className="flex-1 border-gray-600 hover:bg-slate-700"
            >
              Continue
            </Button>
          )}
        </div>
      </form>
    );
  };

  const handleGenerateResume = () => {
    // Call the callback with the collected data
    onDataCollected(formData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] p-3 ${
                message.type === "user"
                  ? "bg-blue-800 border-blue-700"
                  : message.type === "error"
                  ? "bg-red-900 border-red-800"
                  : message.type === "form"
                  ? "bg-slate-800 border-slate-700 w-full max-w-lg"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              {message.type === "user" && (
                <div className="flex items-center justify-end mb-1">
                  <div className="text-xs text-gray-400 mr-1">You</div>
                  <div className="bg-blue-600 rounded-full p-1">
                    <User size={12} className="text-white" />
                  </div>
                </div>
              )}
              
              {message.type === "form" ? (
                <div>
                  <div className="text-sm mb-2 text-gray-200">{message.content}</div>
                  {message.formFields && <FormComponent fields={message.formFields} />}
                </div>
              ) : (
                <div className="text-sm whitespace-pre-wrap text-gray-200">{message.content}</div>
              )}
            </Card>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-3 bg-slate-800 border-slate-700">
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-blue-400" />
                <div className="text-sm text-gray-400">Thinking...</div>
              </div>
            </Card>
          </div>
        )}
        {showGenerateButton && (
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleGenerateResume} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Generate Resume
            </Button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-700 p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="bg-slate-800 border-slate-700 text-white"
            disabled={loading || messages.some(msg => msg.type === "form") || showGenerateButton}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={loading || messages.some(msg => msg.type === "form") || showGenerateButton}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
