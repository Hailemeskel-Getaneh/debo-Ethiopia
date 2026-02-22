import { useSearchParams } from "react-router-dom";
import { AllPrograms } from "./AllPrograms";
import { EducationProgram } from "./EducationProgram";
import { HealthProgram } from "./HealthProgram";
import { SocialSupportProgram } from "./SocialSupportProgram";

/**
 * Smart router: reads ?type= query param and renders the correct program page.
 * This lets the existing navbar links (/programs, /programs?type=education, etc.)
 * all resolve to a single route while showing distinct, dedicated pages.
 */
export function ProgramsRouter() {
    const [params] = useSearchParams();
    const type = params.get("type");

    switch (type) {
        case "education":
            return <EducationProgram />;
        case "health":
            return <HealthProgram />;
        case "social":
            return <SocialSupportProgram />;
        default:
            return <AllPrograms />;
    }
}
