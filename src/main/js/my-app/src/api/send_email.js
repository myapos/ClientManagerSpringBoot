import * as constants from '../constants';
import * as utils from '../utils';

export default async (first, last, email, msg) => {
  // send email request to server side

  const urlSendEmail = `${constants.BASE_URL}/email?fname=${first}&lname=${last}&email=${email}&msg=${msg}&mode=selectedClasses`;

  const sendEmailDone = await utils.ftch(urlSendEmail, 'get', 'cors', false);

  await sendEmailDone;

  console.log('sendEmailDone.status:', sendEmailDone.status);
  if (sendEmailDone.status === 200) {
    console.log('Email where send succesfully');
  } else {
    alert('Something bad happened');
  }
};// end of send_email
