"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"
export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        toast("Empty clipboard",{
          description: "No text found in clipboard",
          variant: "destructive",
        });
        return;
      }

      setUrl(text);

      toast( "Pasted",{
        description: "Link added from clipboard",
      });
    } catch (err) {
      toast( "Error",{
        description: "Clipboard access denied",
        variant: "destructive",
      });
    }
  };

  const handleFetch = async () => {
    if (!url) {
      toast("Missing URL",{
        description: "Please enter a link first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      const result = await res.json();

      if (result.error) {
        toast("Error",{
          description: result.error,
          variant: "destructive",
        });
      } else {
        setData(result);
        toast( "Success",{
          description: "Data fetched successfully",
        });
      }
    } catch (err) {
      toast( "Server Error",{
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Reels Downloader
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Input + Paste */}
          <div className="flex gap-2">
            <Input
              placeholder="Paste Reel URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button variant="secondary" onClick={handlePaste}>
              Paste
            </Button>
          </div>

          {/* Fetch */}
          <Button
            className="w-full"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch"}
          </Button>

          {/* Result */}
          {data && (
            <div className="space-y-4 text-center">
              <p className="font-semibold">{data.title}</p>

              <img
                src={data.thumbnail}
                alt="thumbnail"
                className="rounded-xl w-full"
              />

              <p className="text-sm text-muted-foreground">
                {data.author}
              </p>

              <Button className="w-full">
                Download
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}