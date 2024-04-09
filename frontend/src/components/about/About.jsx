import React from 'react';
import './About.css'; // Import CSS file for styling
import Mansiimg from '../../photo/Mansiimg.jpeg';
import Aaravimg from '../../photo/Aaravimg.jpeg';
import Dheerajimg from '../../photo/dheerajimg.jpeg';
import Himaimg from '../../photo/himaimg.jpeg';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';



const About = () => {
    // Array containing details of team members
    const teamMembers = [
        {
            name: "Aarav Shukla",
            work: "Developed Frontend & UI/UX",
            imgUrl: Aaravimg
        },
        {
            name: "Dheeraj Dubey",
            work: "Developed Backend",
            imgUrl: Dheerajimg
        },
        {
            name: "Mansi Verma",
            work: "ML Model Creator",
            imgUrl: Mansiimg
        },
        {
            name: "Himanchal Verma",
            work: "ML Model Creator",
            imgUrl: Himaimg
        }
    ];

    return (
        <div className="about-container">
            <Navbar />
            <div className="about-content">
                <h2 className="about-title">About Us</h2>
                <p className="about-paragraph">
                Pose Perfect : A New Medium for perfect and injuryfree fitness activities You can practice and perform differnt Yogasanas and varities of Exercises perfectly using
            our web application and get corrections for wrong postures you're making during fitness activities.
                </p>
                <div className="tech-stack">
                    <h3 className="tech-stack-title">Tech Stack</h3>
                    <ul className="tech-stack-list">
                        <li>React</li>
                        <li>Axios Library</li>
                        <li>Django</li>
                        <li>Rest FrameWork</li>
                        <li>Openvc</li>
                        <li>MediaPipe</li>
                        {/* Add more tech stacks as needed */}
                    </ul>
                </div>
                <div className="team-members">
                    <h3 className="team-title">Our Team</h3>
                    <div className="team-grid">
                        {/* Map over the team members array */}
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member">
                                <img src={member.imgUrl} alt={member.name} />
                                <p className="team-member-name">{member.name}</p>
                                <p className="team-member-role">{member.work}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
