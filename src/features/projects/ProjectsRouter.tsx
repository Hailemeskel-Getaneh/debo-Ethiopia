import { AllProjects } from "./AllProjects";

/**
 * Renders the unified projects page which handles filtering 
 * via search params (?status=active, etc.)
 */
export function ProjectsRouter() {
    return <AllProjects />;
}
