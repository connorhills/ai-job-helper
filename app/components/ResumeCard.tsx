import React, { useEffect, useState } from "react"
import { Link } from "react-router"
import ScoreCircle from "./ScoreCircle"
import { usePuterStore } from "~/lib/puter"

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();

    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);
    return (
        <Link to={`/feedback/${id}`} className="resume-card outer-glow animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="font-bold break-words text-[#e7fff7]">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-300">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-[#e7fff7] font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[360px] max-sm:h-[310px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}

export default ResumeCard
