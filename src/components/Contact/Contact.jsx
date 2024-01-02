import "./Contact.scss"
import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import { useTranslation } from "react-i18next";

const Contact = () => {
  const form = useRef();
  const { t } = useTranslation();
  const [emailStatus, setEmailStatus] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dsicv0s', 'template_x7qfmh2', form.current, '832JdVWiGuFP37T9w');
    
    setEmailStatus(true);
    document.getElementById("contact_form").reset();
  }
  
    return (
      <div className="contact_container">
        <h1>Contact Me</h1>

        <div className="contact_card">
        {emailStatus ? (
          <div className="successSent">
            <img src="logo.png" width={200}/>
            <h1>{t("contact.successfullySent")}</h1>
            <p>{t("contact.contactSoon")}</p>
          </div>
        ) : (
          <form id="contact_form" ref={form} onSubmit={sendEmail}>
              <input type="text" required placeholder={t("contact.name")} name="from_name" id="from_name"/>
              <input type="email" required placeholder={t("contact.email")} name="reply_to" id="reply_to"/>
              <textarea className="content" required placeholder={t("contact.message")} name="message"/>
              <button type="submit">{t("contact.button")}</button>
          </form>
        )}
        </div>
      </div>
    )
  }
  
  export default Contact