import React from "react"

export default function ContactForm() {
  return (
    <form 
      className="flex flex-col gap-4"
      onSubmit={e => { e.preventDefault(); alert('Message sent! (demo)') }}
    >
      <input 
        type="text" 
        placeholder="Name" 
        required 
        className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <input 
        type="email" 
        placeholder="Email" 
        required 
        className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <textarea 
        placeholder="Message" 
        required 
        rows={4} 
        className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <button 
        type="submit" 
        className="mt-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
      >
        Send Message
      </button>
    </form>
  )
} 