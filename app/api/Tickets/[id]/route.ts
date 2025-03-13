import Ticket from "@/modules/Ticket";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract ID from URL path
    if (!id) throw new Error("ID is required");

    const foundTicket = await Ticket.findOne({ _id: id });
    if (!foundTicket)
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) throw new Error("ID is required");

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) throw new Error("ID is required");

    const ticketData = await req.json();
    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticketData, {
      new: true,
    });

    if (!updatedTicket)
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Ticket updated", updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
