export interface IMailProvider {
  sendMail(
    from: string,
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void>;
}
