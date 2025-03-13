import TicketForm from "@/components/TicketForm";

export async function generateMetadata({ params }: TicketPageProps) {
  const resolvedParams = await params;
  return {
    title: `Ticket #${resolvedParams.id}`,
    description: `Details for ticket ${resolvedParams.id}`,
  };
}
interface TicketPageProps {
  params: { id: string };
}

const getTicketById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to get ticket.");
  }
  return res.json();
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const resolvedParams = await params;
  const EDITMODE = resolvedParams.id === "new" ? false : true;
  let updateTicketData;
  if (EDITMODE) {
    updateTicketData = await getTicketById(resolvedParams.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return (
    <>
      <div>TicketPage {resolvedParams.id}</div>
      <TicketForm ticket={updateTicketData} />
    </>
  );
};

export default TicketPage;
