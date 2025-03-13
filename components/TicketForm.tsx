"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TicketFormData {
  title: string;
  description: string;
  priority: number; // Note: priority is a number
  progress: number; // Note: progress is a number
  status: string; // You can use a union type if needed (e.g., "not started" | "started" | "done")
  category: string; // You can use a union type if needed (e.g., "hardware problem" | "software problem" | "project")
  active: boolean;
}
interface TicketFormUpdateData {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: number;
  progress?: number;
  status?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const TicketForm = ({ ticket }: { ticket: TicketFormUpdateData }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  const startingTicketData: TicketFormData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem",
    active: true,
  };
  if (EDITMODE) {
    startingTicketData["title"] = ticket.title ?? "no title";
    startingTicketData["description"] = ticket.description ?? "no title";
    startingTicketData["priority"] = ticket.priority ?? 1;
    startingTicketData["progress"] = ticket.progress ?? 0;
    startingTicketData["status"] = ticket.status ?? "no title";
    startingTicketData["category"] = ticket.category ?? "no title";
  }
  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "number" || type === "range"
          ? Number(value) // Convert to number for numeric fields
          : value, // Keep as string for other fields
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("failed to update Ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("failed to create Ticket.");
      }
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update your Ticket" : "Create your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        ></input>
        <label>description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />
        <label>category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="hardware problem">hardware problem</option>
          <option value="software problem">software problem</option>
          <option value="project">project</option>
        </select>
        <label>priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">not started</option>
          <option value="started"> started</option>
          <option value="done">done</option>
        </select>
        <input
          type="hidden"
          name="active"
          value={formData.active.toString()} // Convert boolean to string for input value
          onChange={handleChange}
        />
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
