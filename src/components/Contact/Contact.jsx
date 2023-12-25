import React, { useRef } from "react";
import "./Contact.scss"
import emailjs from '@emailjs/browser'
import { EmailToastify } from '../../utils'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dsicv0s', 'template_x7qfmh2', form.current, '832JdVWiGuFP37T9w');
    EmailToastify("Successfully sent Email");

    document.getElementById("contact_form").reset();
  }
  
    return (
      <div className="contact_container">
        <h1>Contact</h1>

        <div className="contact_card">
            <form id="contact_form" ref={form} onSubmit={sendEmail}>
                <input type="text" required placeholder="🗣️ Your name" name="from_name" id="from_name"/>
                <input type="email" required placeholder="📫 Your Email" name="reply_to" id="reply_to"/>
                <textarea className="content" required placeholder="📝 Your Message" name="message"/>
                <button type="submit">Send it to me ✉️</button>
            </form>
        </div>
      </div>
    )
  }
  
  export default Contact