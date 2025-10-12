import emailjs from 'emailjs-com'

export const sendEmail = async (formData) => {
  try {
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',      // Iz EmailJS dashboarda
      'YOUR_TEMPLATE_ID',     // Iz EmailJS dashboarda  
      formData,
      'YOUR_PUBLIC_KEY'       // Iz EmailJS dashboarda
    )
    return result
  } catch (error) {
    throw error
  }
}