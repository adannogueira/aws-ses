import AWS from 'aws-sdk'
const ses = new AWS.SES()

export class MailSender {
  private params: any = {
    Source: null,
    Destination: {
      ToAddresses: null
    },
    Message: {
      Body: { Text: { Data: null } },
      Subject: { Data: null }
    }

  }

  from (address: string): MailSender {
    this.params.Source = address
    return this
  }

  to (address: string): MailSender {
    this.params.Destination.ToAddresses = [address]
    return this
  }

  message (subject: string, message: string): MailSender {
    this.params.Message = {
      Body: { Text: { Data: message } },
      Subject: { Data: subject }
    }
    return this
  }

  async send (): Promise<{ success: boolean, error?: Error }> {
    try {
      await ses.sendEmail(this.params).promise()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
}