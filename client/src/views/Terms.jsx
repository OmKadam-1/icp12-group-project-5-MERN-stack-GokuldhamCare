import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#e6f4ef] py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-8 text-center">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
            <p>
              Welcome to our hospital website. By using this website, 
              you agree to these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Medical Disclaimer</h2>
            <p>
              The information on this website is for general informational 
              purposes only and is not a substitute for professional medical advice.
              Always consult a qualified doctor for medical concerns.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. User Responsibilities</h2>
            <p>
              Users must provide accurate information while booking appointments 
              or submitting forms. Misuse, hacking, or spam activities are strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Appointment & Services</h2>
            <p>
              Appointments are subject to doctor availability. The hospital reserves 
              the right to reschedule or cancel appointments. Service charges may 
              change without notice.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Privacy Policy</h2>
            <p>
              We respect your privacy. Personal information such as name, email, 
              phone number, and medical details will be stored securely and used 
              only for healthcare and communication purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Intellectual Property</h2>
            <p>
              All website content including text, images, logos, and design 
              belongs to the hospital. Unauthorized copying is prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Limitation of Liability</h2>
            <p>
              The hospital is not responsible for technical issues, incorrect 
              information, or damages resulting from the use of this website.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Changes to Terms</h2>
            <p>
              These terms may be updated anytime. Continued use of the website 
              means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Contact Information</h2>
            <p>Email: healthmatrixservices@gmail.com</p>
            <p>Phone: +91-9876543219</p>
            <p>Address: Maharashtra, India</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;