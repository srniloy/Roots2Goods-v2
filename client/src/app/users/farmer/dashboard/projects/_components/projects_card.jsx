import Link from 'next/link'
import React from 'react'


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const ProjectCards = ({ projects, setIsLoad }) => {
    return (
        <div className="fp-project-container">
            {
                projects?.map((project) => {
                    return (
                        <Link key={project?._id} onClick={() => setIsLoad(ex => ({ ...ex, full: true }))} href={`/users/farmer/project/${project?._id}`}>
                            <div className="f-project-card">
                                <div className="fp-card-cover-img-wrapper">

                                    <img src={`${SERVER_URL}/${project?.img}`} className="fp-card-cover-img" /></div>
                                <div className="fp-card-bottom">
                                    <h3 className="fp-card-heading">{project?.title}</h3>
                                    <div className="fp-project-tag">{project?.status}</div>
                                    <div className="fp-project-tag">{project?.start_time}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }





        </div>
    )
}

export default ProjectCards