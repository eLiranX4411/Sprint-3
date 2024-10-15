import { makeId, saveToStorage } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'mailsDB'

export const mailLoaderService = {
  loadInitialMails,
  deleteAllMails,
}

function loadInitialMails() {
  return storageService.query(MAILS_KEY).then((mails) => {
    if (mails && mails.length) return mails

    const generatedMails = _createMails(100)
    saveToStorage(MAILS_KEY, generatedMails)
    return generatedMails
  })
}

function deleteAllMails() {
  saveToStorage(MAILS_KEY, [])
}

function _createMails(count) {
  const subjects = [
    'Meeting Reminder',
    'Project Update',
    'Invitation to Event',
    'Important Notice',
    'Happy Birthday!',
    'Invoice Attached',
    'Upcoming Webinar',
    'Job Opportunity',
    'Holiday Greetings',
    'New Features Announcement',
    'Team Outing',
    'Quarterly Review',
    'Contract Renewal',
    'Salary Update',
    'Customer Feedback Request',
    'Security Alert',
    'Password Reset',
    'Special Offer for You',
    'Account Verification',
    'Thank You for Your Purchase',
    'New Connection Request',
    'Action Required',
    'Event Cancelled',
    'Welcome to Our Service',
    'Survey Invitation',
    'Service Maintenance Notice',
    'Promotional Discount',
    'Subscription Expiry Reminder',
    'Policy Update',
    'Invitation to Beta Test',
    'Congratulations!',
    'Weekly Newsletter',
    'Your Order Has Shipped',
    'Partnership Opportunity',
    'Reminder: Payment Due',
    'Request for Meeting',
    'Important Product Update',
    'Referral Program',
    'Exclusive Invitation',
    'Social Media Highlights',
  ]

  const bodies = [
    "Hope you're doing well. Just a reminder about our upcoming meeting scheduled for tomorrow at 3 PM.",
    'Please find the latest update on the project attached. Let me know if you have any questions.',
    "You're invited to our annual event! Please RSVP by the end of this week.",
    'This is an important notice regarding your account. Please review the attached document.',
    'Wishing you a fantastic birthday filled with joy and happiness!',
    'Please find the attached invoice for your recent purchase. Let us know if you need further assistance.',
    'Join us for our upcoming webinar on the latest industry trends. Register now to secure your spot.',
    'We have a job opportunity that matches your profile. Please find the details attached.',
    'Happy holidays! We wish you a wonderful time with your loved ones.',
    'We are excited to announce new features in our platform. Check them out now!',
    "Don't forget about our team outing this Friday. We look forward to seeing you there!",
    'Attached is the quarterly review report. Please have a look before the meeting.',
    'Your contract renewal is due soon. Please let us know if you have any questions.',
    'We are happy to announce a salary update effective next month.',
    'We value your opinion. Please provide your feedback on our recent service.',
    'Please take note of this security alert and update your password as soon as possible.',
    'It seems you requested a password reset. Follow the link to reset it.',
    'Take advantage of this special offer available only for a limited time.',
    'Please verify your account to continue enjoying our services.',
    'Thank you for your recent purchase. We appreciate your business.',
    'You have a new connection request. View it in your account.',
    'Action is required on your part. Please follow the instructions in the attachment.',
    'We regret to inform you that the event has been cancelled. We apologize for any inconvenience.',
    'Welcome to our service! We are thrilled to have you on board.',
    "We'd love to hear from you. Please complete this survey to share your thoughts.",
    'Our service will undergo maintenance tomorrow. Expect minor disruptions.',
    'Enjoy a promotional discount on your next purchase. Use the code provided.',
    'Your subscription is about to expire. Renew today to continue enjoying our service.',
    'We have updated our policy. Please review the changes.',
    "You're invited to beta test our new feature. Join us in shaping the future.",
    "Congratulations on your recent achievement! We're proud to celebrate with you.",
    "Here's your weekly newsletter with the latest updates.",
    'Your order has shipped. Track it using the link provided.',
    "We are interested in a partnership with you. Let's discuss further.",
    'Reminder: Your payment is due soon. Please ensure timely payment.',
    "We'd like to request a meeting to discuss the next steps.",
    'An important product update is available. Please read the attached notes.',
    'Join our referral program and earn rewards for sharing.',
    "You're exclusively invited to our upcoming event. RSVP today!",
    'Here are the social media highlights from this week. Stay informed.',
  ]

  const senders = [
    'john.doe@example.com',
    'jane.smith@company.com',
    'events@eventbrite.com',
    'noreply@service.com',
    'hr@company.com',
    'billing@ecommerce.com',
    'webinar@industry.com',
    'careers@jobportal.com',
    'greetings@holiday.com',
    'updates@platform.com',
  ]

  const labelsList = ['important', 'work', 'personal', 'promotions', 'social', 'updates', 'finance', 'travel', 'romantic', 'family']

  const mails = Array.from({ length: count }, (_, index) => {
    const isInbox = Math.random() > 0.5
    const createdAt = Date.now() - Math.floor(Math.random() * 10000000000)
    const sentAt = Math.random() > 0.5 ? createdAt + Math.floor(Math.random() * 100000) : null
    const readAt = Math.random() > 0.7 ? createdAt + Math.floor(Math.random() * 100000) : null
    let from, to

    if (isInbox) {
      from = senders[Math.floor(Math.random() * senders.length)]
      to = 'user@appsus.com'
    } else {
      from = 'user@appsus.com'
      to = senders[Math.floor(Math.random() * senders.length)]
    }

    const labels = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => labelsList[Math.floor(Math.random() * labelsList.length)])

    const isDraft = Math.random() > 0.8
    const isTrash = Math.random() > 0.9

    return {
      id: makeId(),
      createdAt,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      body: bodies[Math.floor(Math.random() * bodies.length)],
      sentAt,
      from,
      to,
      isDraft,
      isTrash,
      isRead: !!readAt,
      readAt,
      removedAt: isTrash ? createdAt + Math.floor(Math.random() * 1000000) : null,
      isStarred: Math.random() > 0.5,
      labels,
    }
  })

  const today = new Date()
  for (let i = 0; i < 20; i++) {
    const randomIdx = Math.floor(Math.random() * mails.length)
    const originalCreatedAt = new Date(mails[randomIdx].createdAt)

    const hours = originalCreatedAt.getHours()
    const minutes = originalCreatedAt.getMinutes()
    const seconds = originalCreatedAt.getSeconds()

    const updatedDate = new Date(today.setHours(hours, minutes, seconds))
    mails[randomIdx].createdAt = updatedDate.getTime()
  }

  return mails
}
