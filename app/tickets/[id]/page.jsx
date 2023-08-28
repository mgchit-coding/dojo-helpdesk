import Loading from "@/app/loading";
import { notFound } from "next/navigation"
import { Suspense } from "react";

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets');
    const tickets = await res.json();

    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}

async function getTickets(id) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const response = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60
        }
    })
    const data = response.json();
    if (!response.ok) {
        notFound()
    }
    console.log({ data });
    return data;
}

export default async function TicketDetails({ params }) {
    const ticket = await getTickets(params.id);
    return (
        <main>
            <nav>
                <h2>Ticket Details {params.id}</h2>
            </nav>
            <Suspense fallback={<Loading />}>
                <div className="card">
                    <h3>{ticket.title}</h3>
                    <small>Created By {ticket.user_email}</small>
                    <p>{ticket.body}</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                </div>
            </Suspense>
        </main>
    )
}
