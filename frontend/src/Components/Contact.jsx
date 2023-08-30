import React from 'react';
import '../Css/Contact.css';

const ContactPage = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Contact Me</h1>
                <p className="intro">
                    Hi, I'm Kuldeep Tiwari, an ambitious Full Stack Web Developer specializing in
                    backend development with 1300+ hours of coding
                    experience. Built numerous websites and applications,
                    demonstrating strong problem-solving skills by
                    solving over 700 data structures and algorithm
                    questions. Seeking a backend developer position to
                    create impactful, scalable products

                </p>
                <div className="contact-links">
                    <div className="link">
                        <i className="fab fa-github"></i>
                        <a href="https://github.com/kuldeep55567" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                    <div className="link">
                        <i className="fas fa-briefcase"></i>
                        <a href="https://kuldeep55567.github.io/" target="_blank" rel="noopener noreferrer">
                            Portfolio
                        </a>
                    </div>
                    <div className="link">
                        <i class="fa-brands fa-linkedin"></i>
                        <a href="https://www.linkedin.com/in/kuldeep-tiwari-code/" target="_blank" rel="noopener noreferrer">
                            Linkedin
                        </a>
                    </div>
                    <div className="link">
                        <i className="fas fa-mobile-alt"></i>
                        <a href="tel:[Your Phone Number]">+91 620 316 7922</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
