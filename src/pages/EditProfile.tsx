"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load existing username
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setUsername(data.username);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Update username
  const handleUpdate = async () => {
    setMessage("");
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("user_profiles")
      .update({
        username,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      setMessage("❌ Error updating username. Please try again.");
    } else {
      setMessage("✅ Username updated successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto shadow-md border border-border">
          <CardHeader>
            <CardTitle>Update Username</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleUpdate}
              disabled={loading || !username.trim()}
              className="w-full"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
            {message && (
              <p
                className={`text-sm text-center mt-2 ${
                  message.includes("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
