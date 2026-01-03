"use client";
import React, { useState } from "react";
import { db } from "@/configuration/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ContactForm({ lang }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const content = {
    en: {
      form: {
        name: "Your Name",
        namePlaceholder: "Enter your full name",
        email: "Your Email",
        emailPlaceholder: "Enter your email address",
        subject: "Subject",
        subjectPlaceholder: "Enter the subject",
        message: "Your Message",
        messagePlaceholder: "Write your message here",
        send: "Send Message",
      },
      messages: {
        success: "Message sent successfully.",
        error: "Failed to send message. Please try again.",
      },
    },
    ar: {
      form: {
        name: "اسمك",
        namePlaceholder: "أدخل اسمك الكامل",
        email: "بريدك الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        subject: "الموضوع",
        subjectPlaceholder: "أدخل الموضوع",
        message: "رسالتك",
        messagePlaceholder: "اكتب رسالتك هنا",
        send: "إرسال الرسالة",
      },
      messages: {
        success: "تم إرسال الرسالة بنجاح.",
        error: "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
    },
  };

  const { form, messages } = content[lang] || content.en;

  const dataChange = (e) => {
    const { name, value } = e.target;
    if (/^\s+$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const collectionRef = collection(db, "contacts");
      await addDoc(collectionRef, {
        ...formData,
        timestamp: serverTimestamp(),
        read: false,
      });
      toast.success(messages.success);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.log("Failed to send message", error);
      toast.error(messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 ">
      <div className="container-fluid w-100 px-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-100 d-flex justify-content-center"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="w-100">
            <div className="card shadow-lg border-0 rounded-4 bg-white bg-opacity-10 backdrop-blur p-4 p-md-5">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white mb-5"
                style={{ fontWeight: 600 }}
              >
                {lang === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
              </motion.h2>

              <form onSubmit={handleSubmit} className="w-100">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label text-white">{form.name}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={dataChange}
                      placeholder={form.namePlaceholder}
                      required
                      className="form-control form-control-lg bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-3"
                      style={{
                        backdropFilter: "blur(8px)",
                        transition: "0.3s",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white">{form.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={dataChange}
                      placeholder={form.emailPlaceholder}
                      required
                      className="form-control form-control-lg bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-3"
                      style={{ backdropFilter: "blur(8px)", transition: "0.3s" }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="form-label text-white">{form.subject}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={dataChange}
                    placeholder={form.subjectPlaceholder}
                    className="form-control form-control-lg bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-3"
                    style={{ backdropFilter: "blur(8px)", transition: "0.3s" }}
                  />
                </div>

                <div className="mt-4">
                  <label className="form-label text-white">{form.message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={dataChange}
                    rows="6"
                    placeholder={form.messagePlaceholder}
                    required
                    className="form-control form-control-lg bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-3"
                    style={{ backdropFilter: "blur(8px)", transition: "0.3s" }}
                  ></textarea>
                </div>

                <div className="d-grid mt-4">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-outline border text-white py-3 rounded-3 fw-semibold"
                    style={{
                      background: "transparent",
                    }}
                  >
                    {loading
                      ? lang === "ar"
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : form.send}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
