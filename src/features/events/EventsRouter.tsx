import { useSearchParams } from "react-router-dom";
import { AllEvents } from "./AllEvents";
import { UpcomingEvents } from "./UpcomingEvents";
import { PastEvents } from "./PastEvents";

/**
 * Reads the ?type= query param and renders the correct events page:
 *   /events                → AllEvents
 *   /events?type=upcoming  → UpcomingEvents
 *   /events?type=past      → PastEvents
 */
export function EventsRouter() {
    const [params] = useSearchParams();
    const type = params.get("type");

    switch (type) {
        case "upcoming":
            return <UpcomingEvents />;
        case "past":
            return <PastEvents />;
        default:
            return <AllEvents />;
    }
}
