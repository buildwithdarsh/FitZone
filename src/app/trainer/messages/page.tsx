"use client";

import Image from "next/image";
import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainerClientNotes } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Search, Send, MessageCircle } from "lucide-react";

const conversations = [
  { id: "c-1", name: "Rahul Sharma", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face", lastMessage: "Thanks Coach! See you tomorrow at 7 AM.", time: "10 min ago", unread: 0, online: true },
  { id: "c-2", name: "Priya Desai", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", lastMessage: "Can we reschedule Thursday to Friday?", time: "35 min ago", unread: 1, online: true },
  { id: "c-3", name: "Karthik Nair", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", lastMessage: "Knee feels much better after the exercises you suggested!", time: "2 hours ago", unread: 0, online: false },
  { id: "c-4", name: "Varun Reddy", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", lastMessage: "Noted on the protein. I'll try adding more paneer.", time: "Yesterday", unread: 0, online: false },
  { id: "c-5", name: "Divya Menon", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", lastMessage: "Loved the functional training session!", time: "Yesterday", unread: 2, online: false },
];

const mockMessages = [
  { id: "m-1", from: "client", text: "Hey Coach, wanted to check — should I do any cardio today or just rest?", time: "9:30 AM" },
  { id: "m-2", from: "trainer", text: "It's your rest day, Rahul. Light walking is fine (20-30 min), but skip the treadmill sprints.", time: "9:35 AM" },
  { id: "m-3", from: "client", text: "Got it. Also, my right shoulder felt tight yesterday during overhead press.", time: "9:40 AM" },
  { id: "m-4", from: "trainer", text: "Thanks for mentioning it. Let's add some band pull-aparts and face pulls as warm-up tomorrow. If it persists, we'll swap OHP for landmine press.", time: "9:45 AM" },
  { id: "m-5", from: "client", text: "Thanks Coach! See you tomorrow at 7 AM.", time: "9:50 AM" },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);

  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return conversations;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const totalUnread = data!.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-sm text-muted mt-1">{totalUnread > 0 ? `${totalUnread} unread` : "All caught up"}</p>
      </div>

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[400px]">
        {/* Conversation list */}
        <div className="w-full sm:w-80 shrink-0 flex flex-col">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {data!.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  selected.id === c.id ? "bg-primary/5 border border-primary/20" : "hover:bg-surface"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image src={c.avatar} alt={c.name} width={40} height={40} className="object-cover" />
                  </div>
                  {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                    <span className="text-[10px] text-muted shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <Card className="hidden sm:flex flex-1 flex-col p-0 overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="h-9 w-9 rounded-full overflow-hidden">
              <Image src={selected.avatar} alt={selected.name} width={36} height={36} className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
              <p className="text-xs text-muted">{selected.online ? "Online" : "Offline"}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "trainer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  msg.from === "trainer"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-surface text-foreground rounded-bl-md"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "trainer" ? "text-white/70" : "text-muted"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 h-10 px-4 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:border-primary/50"
              />
              <button className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
