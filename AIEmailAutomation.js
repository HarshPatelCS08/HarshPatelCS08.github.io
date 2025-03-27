import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function AIEmailAutomation() {
  const [emailContent, setEmailContent] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    if (!emailContent.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("https://your-app.onrender.com/api/generate-email", {
        prompt: emailContent,
      });
      setGeneratedEmail(response.data.email);
    } catch (error) {
      console.error("Error generating email:", error);
      setGeneratedEmail("Failed to generate email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">AI Email Automation</h1>
      <Card className="w-full max-w-md">
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Enter email topic..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
          <Button onClick={generateEmail} disabled={loading}>
            {loading ? "Generating..." : "Generate Email"}
          </Button>
          {generatedEmail && (
            <div className="border p-3 rounded-md bg-gray-100">
              <h2 className="font-semibold">Generated Email:</h2>
              <p>{generatedEmail}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
