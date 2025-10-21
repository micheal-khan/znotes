"use client";
import { Button } from "@/components/ui/button";

const SendEmail = () => {
  const handleSend = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ to: "khanzaidan786@gmail.com" }),
    });

    const result = await res.json();
    console.log(result);
  };

  return <Button onClick={handleSend}>Send Email</Button>;
};

export default SendEmail;
