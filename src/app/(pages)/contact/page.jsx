import ContactForm from '@/component/ui/ContactForm';
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

export const metadata = {
  title: 'Contact Us | Blood Hub',
  description: 'Donate your blood today',
};

export default function ContactPage() {
  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 space-y-8 p-6 bg-red-600 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>

        <div className="flex items-start space-x-4">
          <FiPhone className="text-2xl mt-1" />
          <div>
            <h3 className="text-lg font-semibold">Emergency Hotline</h3>
            <p className="text-xl font-extrabold">999</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FiMail className="text-2xl mt-1" />
          <div>
            <h3 className="text-lg font-semibold">General Inquiries</h3>
            <p>support@bloodrequesthub.org</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FiMapPin className="text-2xl mt-1" />
          <div>
            <h3 className="text-lg font-semibold">Office Location</h3>
            <p>Community Center, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Send Us a Message
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
