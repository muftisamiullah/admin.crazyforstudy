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

const adminEmail = (userName, userEmail) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Title: ${userName} just Signed up on CFS!</title>
        </head>
        <body>
            <p>Hi there!</p>
            <p>You have a new student registration available at CFS!</p>
            <p>Student’s basic details -</p>
            <p>${userName}<p>
            <p>${userEmail}<p>
            </br>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
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

const failedPayementEmail = (userName) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Please Complete your Pending Payment to Proceed Further</title>
        </head>
        <body>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Looks like there was some sort of error! </p>
            <p>We are sorry to inform you that your CFS Subscription could not be completed.</p> 
            <p>Here are some things that might have gone wrong -</p>
            <p><strong>Bad Internet Connection:</strong> Ensure that you have a stable cellular/Wi-Fi connection available.</p>
            <p><strong>Insufficient Balance:</strong> Please check your bank account. Ensure that you have the necessary amount available.</p>
            <p><strong>Bank Service Error:</strong> If you have the required balance available, then there might be an issue with your bank’s services. Connect with them to fix the issue.</p>
            <p><strong>Unwanted Clicks:</strong> Avoid clicking the ‘Back’ button or any other button that might hamper the payment process.</p>
            <p>After checking these, retry your payment again. Hope it Helps!</p>
            <p>See you soon!</p>
            </br>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
            </body>
    </html>`
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

const adminCancelSubsciptionMail = (name, reason, message, start_date, difference) => {
    return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Title: ${name} just Signed up on CFS!</title>
            </head>
            <body>
                <p>Hi there!</p>
                <p>A student just cancelled his/her CFS Subscription. </p>
                <p>Student’s basic details -</p>
                <p>${name}</p>
                <p>${name} just unsubscribed the CFS membership because of ${reason} and ${message}.</p>
                <p>He/She has been a member of CFS since ${start_date} and has been a member for ${difference}.</p>
                </br>
                <p><strong>With regards,</strong></p>
                <p><strong>Team Crazy For Study</strong></p>
            </body>
        </html>`
}

const newQuestionRecieved = (question, subject, sub_subject, subject_id, sub_subject_id, q_id) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Your solution is ready</title>
        </head>
        <body>
            <p>Hey User!</p>
            <p>Your solution is ready for the takeaway.</p>
            <p>Here are the details of your question.</p>
            <p><strong>Question:</strong> ${question}</p>
            <p>You’ll get the solution within 2-4 hours. As soon as we get the answer, you will be notified on both your email as well on your CFS My Account section.</p>
            <a href=https://admin.crazyforstudy.com/solve-50-update-answer/${subject_id}/${sub_subject_id}/pending/undefined/${q_id}>Click here to answer the question</a>
            </br>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const newQuestionRecievedAdmin = (email, question, subject, sub_subject, subject_id, sub_subject_id, q_id) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title> <strong>${email}</strong> just asked a New Question</title>
        </head>
        <body>
            <p>Hi there!</p>
            <p>A student has just posted a new question on CFS. </p>
            <p>Student’s basic details -</p>
            <p><strong>${email}</strong></p>
            <p>Question(s) asked by the student -</p>
            <p><strong>${question}</strong></p>
            <a href=https://admin.crazyforstudy.com/solve-50-update-answer/${subject_id}/${sub_subject_id}/pending/undefined/${q_id}>Click here to answer the question</a>
            </br>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const newQuestionAskedAdmin = (email, question, subject, sub_subject, subject_id, sub_subject_id, q_id) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title> <strong>${email}</strong> just asked new Q&A Question</title>
        </head>
        <body>
            <p>Hi there!</p>
            <p>A student has just posted a new Q&A question on CFS. </p>
            <p>Student’s basic details -</p>
            <p><strong>${email}</strong></p>
            <p>Question(s) asked by the student -</p>
            <p><strong>${question}</strong></p>
            <p>click below to answer:</p>
            <a href=https://admin.crazyforstudy.com/solve-50-update-answer/${subject_id}/${sub_subject_id}/pending/undefined/${q_id}>Click here to answer the question</a>
            </br>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const ask50Solution = (user, question, shortanswer, completeanswer) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Your solution is ready for the takeaway.
            </title>
        </head>
        <body>
            <p>Hey there, ${user}!</p>
            <p>Here are the details of your question.</p>
            
            <p><strong>Question:</strong> ${question}</p>
            <p><strong>Answer:</strong> ${shortanswer}</p>           
            <p><strong>Explanation:</strong> ${completeanswer}</p>
            
            <p> Either <a href="https://www.crazyforstudy.com/user/my-question">click here</a> to get the solution or check out your Crazy For Study’s My Account and get your answer.</p>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const ask50Rejection = (user, question, rejectionReason, rejectionReason1) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>The professor has rejected your question.
            </title>
        </head>
        <body>
        <p>Hi ${user},</p>
    
        <p>The professor has rejected your question.</p>

        <p><strong>Question:</strong>${question}</p>

        <p>These are the reasons that lead to rejection: </p></br>
        <p>1. ${rejectionReason} </p>
        <p>2. ${rejectionReason1}</p>
    
        <p>We request you to ask a question that has easy-to-understand language related to the subject.</p>

        <p><strong>With regards,</strong></p>
        <p><strong>Team Crazy For Study</strong></p>`
}

const askTbsSolution = (user, book_name, chapter_name, section_name, question) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Here are the details of your asked question:
            </title>
        </head>
        <body>
        <p><strong>Book:</strong> ${book_name}</p>
        <p><strong>Chapter:</strong> ${chapter_name}</p>                                                                                                                                 
        <p><strong>Section:</strong> ${section_name}</p>
        <p><strong>Question:</strong> ${question}\n</p>
        
        <p>You’ll get the solution within 2-4 hours. As soon as we get the answer, you will be notified on both your email as well on your CFS My Account section.</p>
   
        <p><strong>With regards,</strong></p>
        <p><strong>Team Crazy For Study</strong></p>
       </body>
    </html>`
}

const askTbsSolutionAdmin = (user, book_name, chapter_name, section_name, question,q_id) => {
    return `<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>${user} just asked for new Textbook Solutions
          </title>
       </head>
       <body>
        <p>Hi there!</p>
        <p>A student has just posted a new TBS requirement on CFS.</p>
        <p>Student’s basic details - </p>
        <p>${user}</p>
        <p>Question(s) asked by the student - </p>
        <p><strong>Book:</strong> ${book_name}</p>
        <p><strong>Chapter:</strong> ${chapter_name}</p>                                                                                                                                     
        <p><strong>Section:</strong> ${section_name}</p>
        <p><strong>Question:</strong> ${question}</p>
        <p><strong>Question Id:</strong> ${q_id}\n</p>
        
        <a href=https://admin.crazyforstudy.com/solve-tbs-update-answer/pending/undefined/${q_id}>Click here to answer the question</a>
        <p><strong>With regards,</strong></p>
        <p><strong>Team Crazy For Study</strong></p>
       </body>
    </html>`
}

const askTbsSolutionSolved = (book_name, chapter_name, section_name, question, solution, q_id) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>TBS Question Solved</title>
        </head>
        <body>
            <p>Hello User your question has been answered\n</p><p>Here are the details of your question:\n\n</p>
            <p><strong>Book:</strong> ${book_name}</p>
            <p><strong>Chapter:</strong> ${chapter_name}</p>                                                                                                                                     
            <p><strong>Section:</strong> ${section_name}</p>
            <p><strong>Question:</strong> ${question}</p>
            <p><strong>Solution:</strong> ${solution}</p>
            
            <p>Team CFS</p>
        </body>
    </html>`
}

const assignmentSubmitUser = (name, topic_name, Assignment_details, expected_delivery_date) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Yaay! Your Assignment Request has been Submitted!</title>
        </head>
        <body>
            <p>Hello ${name},</p>
            <p>We would like to inform you that we have successfully received your Assignment request on ${topic_name}.</p>
            <p><Here’s a brief about your assignment details - </p>                                                                                                                                     
            <p>${Assignment_details}</p>
            <p>If you want to make any changes to any of the provided details, connect with us. </p>
            <p>You can expect to receive your assignment by <strong> ${expected_delivery_date}.</strong></p>
            <p>Thanks for choosing CFS!</p>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const assignmentSubmitAdmin = (student_name, Assignment_details) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${Student_name} just requested for Assignment Help
            </title>
        </head>
        <body>
            <p>Hi there!</p>
            <p>A student has just submitted a new Assignment Help requirement on crazyforstudy.com.
            Student’s basic details -</p>
            <p>${student_name}</p>                                                                                                                                     
            <p>Assignment requirement details as provided by the student </p>
            <p>${Assignment_details}</p>
            <p>Thanks for choosing CFS!</p>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
}

const assignmentSubmitUserSolution = (name, order_request_date, delivery_date, number_of_days, order_number) => {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Completed Assignment available now. Order No.: ${order_number}</title>
        </head>
        <body>
            <p>Hello ${name},</p>
            <p>We are excited to announce that our experts have completed your Assignment Help request. You had submitted the request on ${order_request_date} and received it on ${delivery_date}. </p>                                                                                                                                     
            <p>That’s just ${number_of_days} !!! </p>
            <p>Trust me, we are sometimes even faster than this!</p>
            <p>Here’s your Assignment details - </p>
            <p>order_number</p>
            <p>order_number</p>
            <p>You can now view/download the assignment from this link - <a href="https://www.crazyforstudy.com/">crazyforstudy.com</a>.</p>
            <p>If you need any revisions, connect with us from this link - <a href="https://www.crazyforstudy.com/">crazyforstudy.com</a>.</p>
            <p>Good grades await you!</p>
            </br>
            <p>Thank you for using our services and for choosing CFS!</p>
            <p><strong>With regards,</strong></p>
            <p><strong>Team Crazy For Study</strong></p>
        </body>
    </html>`
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
    ask50Solution,
    ask50Rejection,
    askTbsSolution,
    askTbsSolutionAdmin,
    askTbsSolutionSolved,
    newQuestionRecievedAdmin,
    newQuestionAskedAdmin,
    assignmentSubmitUser,
    assignmentSubmitAdmin,
    assignmentSubmitUserSolution,
}