'use strict';

import { MailSender } from './MailSender';

export const createContact = async ({ body }) => {
  const { from, to, subject, message } = JSON.parse(body);
  if (!from || !to || !subject || !message) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Missing parameters' }) }
  }
  const mailSender = new MailSender()
  const result = await mailSender
    .from(from)
    .to(to)
    .message(subject, message)
    .send()

  return result.success
    ? { statusCode: 200, body: JSON.stringify({ message: 'Email sent successfully' }) }
    : { statusCode: 400, body: JSON.stringify({ message: result.error.message }) }
}

