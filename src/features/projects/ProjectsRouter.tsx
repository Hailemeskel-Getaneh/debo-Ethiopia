import { useSearchParams } from "react-router-dom";
import { AllProjects } from "./AllProjects";
import { ActiveProjects } from "./ActiveProjects";
import { CompletedProjects } from "./CompletedProjects";
import { UpcomingProjects } from "./UpcomingProjects";

/**
 * Reads the ?status= query param and renders the correct projects page:
 *   /projects               → AllProjects
 *   /projects?status=active → ActiveProjects
 *   /projects?status=completed → CompletedProjects
 *   /projects?status=upcoming  → UpcomingProjects
 */
export function ProjectsRouter() {
    const [params] = useSearchParams();
    const status = params.get("status");

    switch (status) {
        case "active":
            return <ActiveProjects />;
        case "completed":
            return <CompletedProjects />;
        case "upcoming":
            return <UpcomingProjects />;
        default:
            return <AllProjects />;
    }
}
