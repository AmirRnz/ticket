import TicketCard from "@/components/TicketCard";
import { TicketFormData } from "@/types/types";
import { TicketDataFromDb } from "@/types/types";

interface TicketResponse {
  tickets: TicketDataFromDb[];
}

const getTickets = async (): Promise<TicketResponse> => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json() as Promise<TicketResponse>;
  } catch (error) {
    console.log("failed to get tickets", error);
    throw error;
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  console.log(tickets);
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }: TicketFormData) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="lg: grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
