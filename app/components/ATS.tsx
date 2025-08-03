import { cn } from "~/lib/utils";

const ATS = ({
    score,
    suggestions,
}: {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl shadow-md w-full p-1", // p-1 creates the border thickness
                score > 40
                    ? "bg-gradient-to-b from-[#00eba0] to-[#00d438] ats-glow-green"
                    : score > 49
                        ? "bg-gradient-to-b from-yellow-400 to-yellow-600 ats-glow-yellow"
                        : "bg-gradient-to-b from-red-400 to-red-600 ats-glow-red"
            )}
        >
            <div className="rounded-xl bg-[#2d343b] p-8 flex flex-col gap-4 w-full h-full">
                <div className="flex flex-row gap-4 items-center">
                    <img
                        src={
                            score > 69
                                ? "/icons/ats-good.svg"
                                : score > 49
                                    ? "/icons/ats-warning.svg"
                                    : "/icons/ats-bad.svg"
                        }
                        alt="ATS"
                        className="w-10 h-10"
                    />
                    <p className="text-2xl font-semibold text-white">ATS Score - {score}/100</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-medium text-xl text-white">
                        How well does your resume pass through Applicant Tracking Systems?
                    </p>
                    <p className="text-lg text-gray-200">
                        Your resume was scanned like an employer would. Here's how it
                        performed:
                    </p>
                    {suggestions.map((suggestion, index) => (
                        <div className="flex flex-row gap-2 items-center" key={index}>
                            <img
                                src={
                                    suggestion.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt="ATS"
                                className="w-4 h-4"
                            />
                            <p className={cn(
                                "text-lg",
                                suggestion.type === "good"
                                    ? "text-green-400"
                                    : "text-yellow-400"
                            )}>
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                    <p className="text-lg text-white">
                        Want a better score? Improve your resume by applying the suggestions
                        listed below.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ATS;