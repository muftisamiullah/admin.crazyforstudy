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
                                <p style="margin:10px 0 0 0;font-size:15px; font-family:Arial,Helvetica,sans-serif;">Dear ${Name},</p>
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


















const welcomeEmail = (clientName, username) => `<p>Welcome ${clientName}, your username is ${username}.</p>`

module.exports = { forgotPassword, welcomeEmail }