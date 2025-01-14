import { useState, FormEvent } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "@/config";
import axios from "axios";

interface SignInFormData {
  email: string;
  password: string;
}

export function SignAdmin() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, formData) as { success: boolean, token: string };
      localStorage.setItem("admintoken", res.token);
      console.log("Login successful");
    } catch (err: any) {
      // Handle error
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Enter your email and password to access your account.</p>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account? <Link to="/adminsignup">Sign Up</Link>
      </div>
    </div>
  );
}
