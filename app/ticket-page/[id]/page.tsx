import TicketForm from "@/components/TicketForm";

export async function generateMetadata({ params }: TicketPageProps) {
  const resolvedParams = await params;
  return {
    title: `Ticket #${resolvedParams.id}`,
    description: `Details for ticket ${resolvedParams.id}`,
  };
}
type TicketPageProps = {
  params: {
    id: string;
  };
};
const TicketPage = async ({ params }: TicketPageProps) => {
  const resolvedParams = await params;
  return (
    <>
      <div>TicketPage {resolvedParams.id}</div>
      <TicketForm />
    </>
  );
};

export default TicketPage;
