import Ticket from "@/modules/Ticket";
import { NextResponse } from "next/server";
interface TicketData {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
}

export async function POST(req: Request) {
  console.log("post hit");
  try {
    const body = await req.json();
    console.log(body);
    const ticketData: TicketData = body;

    if (!ticketData.title || !ticketData.description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
