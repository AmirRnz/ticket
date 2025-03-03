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
      <p>hi</p>
    </>
  );
};

export default TicketPage;
