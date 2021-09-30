const forgotPassword = (name, email, code) => 
    `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Forgot Password</title>
        </head>
        <body>
            <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="border:1px #fff solid">
            <tbody>
                <tr>
                    <td>
                    <table width="600" cellspacing="0" cellpadding="0" border="0" style="border:solid 1px #f8d021">
                        <tbody>
                            <tr>
                                <td valign="middle" align="left" colspan="2" style="background:#f8d021;padding:3px 0;border-bottom:#ff6a00 solid 6px"><a style="color:#fff;font-size:20px;font-weight:bold" href="#" target="_blank"> <img width="150" border="0" align="absmiddle" alt="www.crazyforstudy.com" title="https://www.crazyforstudy.com" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/crazyforstudy-logo.png" class="CToWUd"></a> </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left" style="background:#fff;padding:0 10px;font-size:15px;line-height:24px;color:#333;padding:10px; font-family:Arial,Helvetica,sans-serif;">
                                <p style="font-size: 36px; color:#125c9c; font-family:Arial,Helvetica,sans-serif; line-height: 36px; padding-top: 29px; margin-top:0px;">Forgot your password?</p>
                                <p style="margin:10px 0 0 0;font-size:15px; font-family:Arial,Helvetica,sans-serif;">Dear ${name},</p>
                                <p>We recently received a request to reset the password for your CrazyForStudy account. We’re here to help you.</p>
                                <p>Your Password on <a href="https://www.crazyforstudy.com/">crazyforstudy.com</a>. Please keep it in your records so you don't forget it.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 19px; padding:0 20px 20px 20px; padding-bottom: 5px; ">
                                <div class="">
                                    <ul style="padding-left:0px; margin-top:0px; margin-bottom:0px;">
                                        <li style="display:inline-block; list-style:none; font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 19px; padding-top: 0px;  width:140px; padding-bottom: 5px; padding-left:1px;">User Id/Email Id</li>
                                        <li style="display:inline-block;   border-radius:3px;  list-style:none; font-size: 16px; color:#15c; font-family: helvetica, arial, sans-serif;  line-height: 19px; padding:7px 20px;">${email}</li>
                                    </ul>
                                    <ul style="padding-left:0px; margin-top:0px;">
                                        <li style="display:inline-block; list-style:none; font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 19px; width:140px; padding-top: 0px; padding-bottom: 5px; padding-left:1px;">Reset Code</li>
                                        <li style="display:inline-block; border-radius:3px;  list-style:none; font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif;   line-height: 19px; padding:7px 20px;">${code}</li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 19px; padding-top: 0px; padding-bottom: 5px; padding-left:20px;">
                                <p>Wanna Reset? Simply click on the link below to reset your password.</p>
                                <a href="#" style="font-size: 16px; background:#f8d021; text-decoration:none; margin-top:10px; margin-bottom:10px; display:inline-block; padding:10px 24px; border-radius:3px; font-family: helvetica, arial, sans-serif;    color:#000;">Reset Password</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 29px; padding-left:20px; padding-right:20px;">If you did not request a password reset, please ignore this mail or reply to let us know. Don’t worry! Your password is safe with us.
                                <br><br>Thank you!<br><br>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; color:#333; font-family: helvetica, arial, sans-serif; line-height: 25px; padding-bottom: 10px; padding-left:20px;">
                                Team,<br>
                                CrazyForStudy 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td width="113" valign="top" align="left" style="background:#002147;padding:12px 0 5px 12px;color:#fff;font-size:15px;font-family:Arial,Helvetica,sans-serif;">Contact Us<br><a style="color:#fff;text-decoration:none" href="#" target="_blank">www.<span>crazyforstudy.com</span></a><br>
                                            <a style="color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;" href="mailto:support@crazyforstudy.com" target="_blank">support@<span>crazyforstudy.com</span></a><br>
                                            </td>
                                            <td width="299" valign="top" align="right" style="background:#002147;padding:5px 5px">
                                            <table width="80" height="20px" cellspacing="2" cellpadding="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#000;font-style:normal;padding:5px;font-size:11px;line-height:15px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="middle" align="center" style="font-size:12px;font-weight:bold;color:#333;padding:4px 0 0 5px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;" colspan="3">Follow us</td>
                                                    </tr>
                                                    <tr>
                                                        <td><a href="https://www.facebook.com/Crazy-for-Study-133559800329407" target="_blank"><img alt="logo facebook" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/fb-icon.png" class="CToWUd"> </a></td>
                                                        <td><a href="https://twitter.com/CrazyForStudy1" target="_blank"><img alt="logo Twitter" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/twtr-icon.png" class="CToWUd"> </a></td>
                                                        <td><a href="https://www.instagram.com/crazyforstudy_cfs" target="_blank"><img alt="logo Instagram" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/instagram.png" class="CToWUd"> </a></td>
                                                        <td><a href="https://www.pinterest.com/crazyforstudy1" target="_blank"><img alt="logo Pinterest" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/pinterest.png" class="CToWUd"> </a> </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
        </body>
    </html>`


const welcomeEmail = (email, password, link) => 
    `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Welcome to Crazy For Study!</title>
        </head>
        <body>
            <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="border:1px #fff solid">
                <tbody>
                    <tr>
                    <td>
                        <table width="600" cellspacing="0" cellpadding="0" border="0" style="border:solid 1px #f8d021">
                            <tbody>
                                <tr>
                                <td valign="middle" align="left" colspan="2" style="background:#f8d021;padding:3px 0;border-bottom:#ff6a00 solid 6px"><a style="color:#fff;font-size:20px;font-weight:bold" href="#" target="_blank"> <img width="150" border="0" align="absmiddle" alt="www.crazyforstudy.com" title="https://www.crazyforstudy.com" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/crazyforstudy-logo.png" class="CToWUd"></a> </td>
                                </tr>
                                <tr>
                                <td valign="middle" align="left" style="background:#fff;padding:0 10px;font-size:15px;line-height:24px;color:#333;padding:10px; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                    <strong>Hi ! </strong>&nbsp;
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">We congratulate you on becoming a part of <b>Crazy For Study - Your Academic Search Engine</b>. Now we would like to inform you that by subscribing to our pack you can get immediate access to Unlimited Textbook Solutions Manual, Pre-existing 40 million Homework Q&amp;A and Ask 50 New Homework Questions from professors at just $7/month.</p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">You can also use our Assignment Writing Services which has been providing help to the students with their studies for a long time. Our Assignment Writing Services can ensure A+ grade in your College Assignments and also can make an obvious difference in your college grade. Get quality Assignments Written by university professors and get rid of your academic pressure. </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                        If you face any issues regarding your academics or subscription just remember, we are just a text away. Chat with our highly trained professionals or mail us at <a href="mailto:support@crazyforstudy.com" target="_blank">support@crazyforstudy.com</a> 
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"><a href="https://www.crazyforstudy.com/paynow" target="_blank">Subscribe Now!</a>
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"><a href=${link} target="_blank">Verify your account!</a>
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"> <b>Your login credentials are:</b></p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"> 
                                        <strong>UserName: </strong><a href="mailto:${email}" target="_blank">${email}</a><br>
                                        <strong>Password: </strong>${password}
                                    </p>
                                    <p></p>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                            <td valign="bottom" align="left" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:14px; font-family:Arial,Helvetica,sans-serif;">Thank you for using our services,<br>Stay Tuned<br>Crazy For Study</td>
                                            <td></td>
                                            <td></td>
                                            <td valign="bottom" align="right" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:11px">
                                                <img src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/rozorpay-icon.jpg" alt="Paypal" class="CToWUd"><img width="88" height="87" title="100% Satisfaction" alt="100% Satisfaction" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/satisfaction.jpg" class="CToWUd">
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                            <td width="113" valign="top" align="left" style="background:#002147;padding:12px 0 5px 12px;color:#fff;font-size:15px; font-family:Arial,Helvetica,sans-serif;">Contact Us<br><a style="color:#fff;text-decoration:none" href="#" target="_blank">www.<span>crazyforstudy.com</span></a><br>
                                                <a style="color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;" href="mailto:support@crazyforstudy.com" target="_blank">support@<span>crazyforstudy.com</span></a><br>
                                            </td>
                                            <td width="299" valign="top" align="right" style="background:#002147;padding:5px 5px">
                                                <table width="80" height="20px" cellspacing="2" cellpadding="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#000;font-style:normal;padding:5px;font-size:11px;line-height:15px">
                                                    <tbody>
                                                        <tr>
                                                        <td valign="middle" align="center" style="font-size:12px;font-weight:bold;color:#333;padding:4px 0 0 5px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;" colspan="3">Follow us</td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="https://www.facebook.com/Crazy-for-Study-133559800329407" target="_blank"><img alt="logo facebook" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/fb-icon.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://twitter.com/CrazyForStudy1" target="_blank"><img alt="logo Twitter" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/twtr-icon.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://www.instagram.com/crazyforstudy_cfs" target="_blank"><img alt="logo Instagram" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/instagram.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://www.pinterest.com/crazyforstudy1" target="_blank"><img alt="logo Pinterest" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/pinterest.png" class="CToWUd"> </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>`

const adminEmail = (userEmail) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>New User Registered!</title>
        </head>
        <body>
            <p>new user registered ${userEmail}</p>
        </body>
    </html>`
}

const subscriptionEmail = (name,email,pay_id, sub_id) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Subscription</title>
        </head>
        <body>
            <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="border:1px #fff solid">
                <tbody>
                    <tr>
                    <td>
                        <table width="600" cellspacing="0" cellpadding="0" border="0" style="border:solid 1px #f8d021">
                            <tbody>
                                <tr>
                                <td valign="middle" align="left" colspan="2" style="background:#f8d021;padding:3px 0;border-bottom:#ff6a00 solid 6px"><a style="color:#fff;font-size:20px;font-weight:bold" href="#" target="_blank"> <img width="150" border="0" align="absmiddle" alt="www.crazyforstudy.com" title="https://www.crazyforstudy.com" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/crazyforstudy-logo.png" class="CToWUd"></a> </td>
                                </tr>
                                <tr>
                                <td valign="middle" align="left" style="background:#fff;padding:0 10px;font-size:15px;line-height:24px;color:#333;padding:10px;font-family:Arial,Helvetica,sans-serif;">
                                    <strong>Hi ${name}! </strong>&nbsp;
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">Congratulations on subscribing to our subscription! We have received your payment for the $7/month.</p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">With this subscription you will be able to access the following: </p>
                                    <ul style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                        <li> Unlimited Textbook Solutions Manual</li>
                                        <li> Unlimited pre-existing homework questions and answers.</li>
                                        <li> 50 new questions every month.</li>
                                    </ul>
                                    <p></p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                        Your subscription will renew on2021-08-24 and the payment for the same will be auto-deducted from your registered payment details.
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                        If you feel dissatisfied with our services, you can cancel anytime and get a refund in your registered bank account within 24 to 72 hours.
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;">
                                        We hope you have a pleasant time studying with us!
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"><a href="https://crazyforstudy.com/user/my-profile" target="_blank">My Account!</a>
                                    </p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"> <b>Your Payment Detail are:</b></p>
                                    <p style="margin:10px 0 0 0; font-size:15px; font-family:Arial,Helvetica,sans-serif;"> 
                                        <strong>Payment Id: </strong>${pay_id}<br>
                                        <strong>subscription Id: </strong>${sub_id}   
                                    </p>
                                    <p></p>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                            <td valign="bottom" align="left" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:14px; font-family:Arial,Helvetica,sans-serif;">Thank you for using our services,<br>Stay Tuned<br>Crazy For Study</td>
                                            <td></td>
                                            <td></td>
                                            <td valign="bottom" align="right" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:11px">
                                                <img src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/rozorpay-icon.jpg" alt="Paypal" class="CToWUd">
                                                <img width="88" height="87" title="100% Satisfaction" alt="100% Satisfaction" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/satisfaction.jpg" class="CToWUd">
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                            <td width="113" valign="top" align="left" style="background:#002147;padding:12px 0 5px 12px;color:#fff;font-size:15px;font-family:Arial,Helvetica,sans-serif;">Contact Us<br><a style="color:#fff;text-decoration:none" href="#" target="_blank">www.<span>crazyforstudy.com</span></a><br>
                                                <a style="color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;" href="#" target="_blank">support@<span>crazyforstudy.com</span></a><br>
                                            </td>
                                            <td width="299" valign="top" align="right" style="background:#002147;padding:5px 5px">
                                                <table width="80" height="20px" cellspacing="2" cellpadding="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#000;font-style:normal;padding:5px;font-size:11px;line-height:15px">
                                                    <tbody>
                                                        <tr>
                                                        <td valign="middle" align="center" style="font-size:12px;font-weight:bold;color:#333;padding:4px 0 0 5px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;" colspan="3">Follow us</td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="https://www.facebook.com/Crazy-for-Study-133559800329407" target="_blank"><img alt="logo facebook" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/fb-icon.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://twitter.com/CrazyForStudy1" target="_blank"><img alt="logo Twitter" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/twtr-icon.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://www.instagram.com/crazyforstudy_cfs" target="_blank"><img alt="logo Instagram" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/instagram.png" class="CToWUd"> </a></td>
                                                            <td><a href="https://www.pinterest.com/crazyforstudy1" target="_blank"><img alt="logo Pinterest" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/pinterest.png" class="CToWUd"> </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>`
}

const failedPayementEmail = () => {
    return `<p>failed payment</p>`
}

const cancelSubscription = (name) => {
    return `<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Cancellation request received</title>
       </head>
       <body>
          <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="border:1px #fff solid">
          <tbody>
             <tr>
                <td>
                   <table width="600" cellspacing="0" cellpadding="0" border="0" style="border:solid 1px #f8d021">
                      <tbody>
                         <tr>
                            <td valign="middle" align="left" colspan="2" style="background:#f8d021;padding:3px 0;border-bottom:#ff6a00 solid 6px"><a style="color:#fff;font-size:20px;font-weight:bold" href="#" target="_blank"> <img width="150" border="0" align="absmiddle" alt="www.crazyforstudy.com" title="https://www.crazyforstudy.com" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/crazyforstudy-logo.png" class="CToWUd"></a> </td>
                         </tr>
                         <tr>
                            <td valign="middle" align="left" style="background:#fff;padding:0 10px;font-size:15px;line-height:24px;color:#333;padding:10px; font-family:Arial,Helvetica,sans-serif;">
                               <strong>Hi ${name}! </strong>&nbsp;
                               <p style="margin:10px 0 0 0;font-size:15px; font-family:Arial,Helvetica,sans-serif;">We are sorry to see you go due  " Not satisfied with the services ".</p>
                               <p style="margin:10px 0 0 0;font-size:15px; font-family:Arial,Helvetica,sans-serif;">We have canceled your subscription; however, you may continue accessing all the services. The services will be discontinued on the subscription’s expiry day. .
                               </p>
                               <p style="font-size:15px; font-family:Arial,Helvetica,sans-serif;">As you have canceled the subscription today, you may remain assured that the next fee
                                  for the subscription plan will not be deducted from the account.
                               </p>
                               <p style="margin:10px 0 0 0; font-family:Arial,Helvetica,sans-serif;">Hope we will get the privilege of assisting you again..</p>
                            </td>
                         </tr>
                         <tr>
                            <td>
                               <table width="100%">
                                  <tbody>
                                     <tr>
                                        <td valign="bottom" align="left" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:14px;  font-family:Arial,Helvetica,sans-serif;">Thank you for using our services,<br>Team Crazy For Study</td>
                                        <td></td>
                                        <td></td>
                                        <td valign="bottom" align="right" style="background:#fff;padding:0 5px 10px 5px;color:#333;font-size:11px">
                                           <img src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/rozorpay-icon.jpg" alt="Paypal" class="CToWUd"><img width="88" height="87" title="100% Satisfaction" alt="100% Satisfaction" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/satisfaction.jpg" class="CToWUd">
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </td>
                         </tr>
                         <tr>
                            <td>
                               <table width="100%" cellspacing="0" cellpadding="0">
                                  <tbody>
                                     <tr>
                                        <td width="113" valign="top" align="left" style="background:#002147;padding:12px 0 5px 12px;color:#fff;font-size:15px;font-family:Arial,Helvetica,sans-serif;">Contact Us<br><a style="color:#fff;text-decoration:none" href="#" target="_blank">www.<span>crazyforstudy.com</span></a><br>
                                           <a style="color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;" href="mailto:support@crazyforstudy.com" target="_blank">support@<span>crazyforstudy.com</span></a><br>
                                        </td>
                                        <td width="299" valign="top" align="right" style="background:#002147;padding:5px 5px">
                                           <table width="80" height="20px" cellspacing="2" cellpadding="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#000;font-style:normal;padding:5px;font-size:11px;line-height:15px">
                                              <tbody>
                                                 <tr>
                                                    <td valign="middle" align="center" style="font-size:12px;font-weight:bold;color:#333;padding:4px 0 0 5px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;" colspan="3">Follow us</td>
                                                 </tr>
                                                 <tr>
                                                    <td><a href="https://www.facebook.com/Crazy-for-Study-133559800329407" target="_blank"><img alt="logo facebook" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/fb-icon.png" class="CToWUd"> </a></td>
                                                    <td><a href="https://twitter.com/CrazyForStudy1" target="_blank"><img alt="logo Twitter" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/twtr-icon.png" class="CToWUd"> </a></td>
                                                    <td><a href="https://www.instagram.com/crazyforstudy_cfs" target="_blank"><img alt="logo Instagram" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/instagram.png" class="CToWUd"> </a></td>
                                                    <td><a href="https://www.pinterest.com/crazyforstudy1" target="_blank"><img alt="logo Pinterest" src="https://crazyforstudy.s3.ap-south-1.amazonaws.com/email-images/pinterest.png" class="CToWUd"> </a> </td>
                                                    </tr>
                                              </tbody>
                                           </table>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </td>
                         </tr>
                      </tbody>
                   </table>
       </body>
    </html>`
}

const adminCancelSubsciptionMail = (reason, message) => {
    return `<p>${reason}</p><p>${message}</p>`
}

const newQuestionRecieved = (question) => {
    return `<p>${question}</p>`
}


module.exports = { 
    forgotPassword,
    welcomeEmail, 
    adminEmail, 
    subscriptionEmail, 
    failedPayementEmail, 
    cancelSubscription, 
    adminCancelSubsciptionMail,
    newQuestionRecieved,
}