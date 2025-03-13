import Ticket from "@/modules/Ticket";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const ticketData = await req.json();
    console.log(ticketData);
    const updateTicketData = await Ticket.findByIdAndUpdate(id, ticketData, {
      new: true,
    });
    console.log(`ticket by id ${id} updated`, updateTicketData);
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
