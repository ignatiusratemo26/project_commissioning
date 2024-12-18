import React from 'react'
import {  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader , Input, TextareaAutosize, Button } from "@mui/material"

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardHeader>Our Contact Information</CardHeader>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-primary" />
              <span>123 Biashara Street, Juja, Kenya</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-primary" />
              <span>+254 716 176 560</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-primary" />
              <span>support@ncapc.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-primary" />
              <span>Mon-Fri: 9AM-5PM</span>
            </div>
            
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary-dark"><FaFacebookF /></a>
                <a href="#" className="text-primary hover:text-primary-dark"><FaTwitter /></a>
                <a href="#" className="text-primary hover:text-primary-dark"><FaInstagram /></a>
                <a href="#" className="text-primary hover:text-primary-dark"><FaLinkedinIn /></a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardHeader>Send Us a Message</CardHeader>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <Input id="subject" placeholder="Message Subject" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <TextareaAutosize id="message" placeholder="Your message here..." className="min-h-[150px]" />
              </div>
              <Button type="submit" variant='outlined' className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <Card className="mt-8">
        <CardHeader>
          <CardHeader>Our Location</CardHeader>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16176.524398273898!2d37.00591979162472!3d-1.1048810941116285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f46276c2d9021%3A0xbefd8e40071d3352!2sJomo%20Kenyatta%20University%20Of%20Agriculture%20And%20Technology!5e0!3m2!1sen!2ske!4v1734519069650!5m2!1sen!2ske"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{border: 0}} 
              allowFullScreen
              title="Company Location"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactPage

