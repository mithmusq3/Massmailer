const nodemailer = require('nodemailer');
require("dotenv").config();
const { google, compute_alpha } = require("googleapis");
var count = 0;
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.log("*ERR: ", err)
                    reject();
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });
        return transporter;
    } catch (err) {
        return err
    }
};

const sendMail = async (company_name, to_address) => {
    try {
        const mailOptions = {
            from: `"Vortex, NIT Trichy" <${process.env.USER_EMAIL}>`,
            to: to_address,
            subject: "Invitation from NIT, Trichy to form an association with Vortex",
            html: `<div dir="ltr"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:10pt"><span style="font-size:11pt;font-family:Verdana;background-color:transparent;font-style:italic;vertical-align:baseline"><span style="background-color:transparent;font-size:11pt;vertical-align:baseline"><span style="font-size:11pt">Greetings from Computer Science and Engineering Association (CSEA), NIT Trichy!</span></span></span></p><div><div dir="ltr"><div dir="ltr"><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">We hope this email finds you in the pink of health. We have written this email to invite <b>${company_name} </b></span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">to form an association with </span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Vortex</span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">. The details of the said organization and our institution are mentioned below.</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">National Institute of Technology, Tiruchirappalli</span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"> (</span><a href="https://www.nitt.edu/" style="text-decoration-line:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.nitt.edu/&amp;source=gmail&amp;ust=1707762087579000&amp;usg=AOvVaw1wrQ2AT-uoPo4tPVHNX1D3"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;text-decoration-line:underline;vertical-align:baseline">NITT</span></a><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">)</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">The</span><a href="https://en.wikipedia.org/wiki/National_Institute_of_Technology,_Tiruchirappalli" style="text-decoration-line:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://en.wikipedia.org/wiki/National_Institute_of_Technology,_Tiruchirappalli&amp;source=gmail&amp;ust=1707762087579000&amp;usg=AOvVaw3tcHq0dDSDtBRD1CZafJpn"><span style="font-size:11pt;font-family:Verdana;color:rgb(34,34,34);font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"> </span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;text-decoration-line:underline;vertical-align:baseline">National Institute of Technology, Tiruchirappalli</span></a><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"> (NITT), is one of India's most prominent engineering institutions. With nearly 60 years of rich history, NITT is acclaimed as a magnet for bright minds and boasts unique contributions to the world of technology.&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"><br></span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Vortex</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">The Computer Science and Engineering Association hosts the annual national-level technical symposium Vortex, an arena to bring together enthusiasts of various facets of Computer Science. Vortex brings to the table an amalgamation of workshops, events, and guest lectures. It provides students a ground to share, cultivate and enrich their comprehension with other like-minded enthusiasts.</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Here are some stats from the previous editions of Vortex:</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Online Registrations: 7.5k+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Footfall: 9k+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Instagram reach: 17k+<br></span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Facebook Monthly Reach: 10k+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Facebook Followers: 5.7k+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Instagram Followers: 2k+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Colleges Participated: 250+</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Advertised in </span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">300+ </span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">colleges across India.&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">This symposium shall serve as a great platform for <b>${company_name} </b></span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">to interact directly with the finest of students and at the same time enable students to get to know more about your esteemed firm. </span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Vortex </span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">would be glad to develop a positive relationship between the students of </span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">NIT Trichy</span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"> and </span><span style="font-family:Verdana;font-size:14.6667px;font-style:italic;font-weight:700">${company_name}</span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">.</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">&nbsp;</span></p><p dir="ltr" style="line-height:1.9872;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">Looking forward to an association that shall be mutually beneficial. To know more about Vortex </span><span style="font-size:11pt;font-family:Verdana;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline">please check the brochure attached to this mail</span><span style="font-size:11pt;font-family:Verdana;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;vertical-align:baseline"> or visit our social media pages (links provided below). I shall be glad to furnish you with any further details.</span></p></div></div></div><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:10pt"><span style="font-size:11pt;font-family:Verdana;background-color:transparent;font-style:italic;vertical-align:baseline">
            Kind Regards,</span></p><div dir="ltr" align="left" style="margin-left:0pt"><table style="border:none;border-collapse:collapse"><colgroup><col width="210"><col width="210"></colgroup><tbody><tr style="height:155.25pt"><td rowspan="6" style="border-right:0.75pt solid rgb(0,0,255);vertical-align:top;padding:0pt 8pt 0pt 0pt;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline">&nbsp; <img width="200" height="154" src="https://ci3.googleusercontent.com/mail-sig/AIorK4xbMJg057ZuhTKNKt-2gMorrNc4iDiPhw9vvuKNSc48yym36ZlHVo0_HvWohllh9lFShT9w9iQ" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: -8px; top: -8px;"><span data-is-tooltip-wrapper="true" class="a5q" jsaction="JIbuQc:.CLIENT"><button class="VYBDae-JX-I VYBDae-JX-I-ql-ay5-ays CgzRE" jscontroller="PIVayb" jsaction="click:h5M12e;clickmod:h5M12e; pointerdown:FEiYhc; pointerup:mF5Elf; pointerenter:EX0mI; pointerleave:vpvbp; pointercancel:xyn4sd; contextmenu:xexox;focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd;" data-idom-class="CgzRE" jsname="hRZeKc" aria-label="Download attachment " data-tooltip-enabled="true" data-tooltip-id="tt-c78" data-tooltip-classes="AZPksf" id="" jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc4NDE3NDI5MjQzMzk4ODA5NCJd; 43:WyJpbWFnZS9qcGVnIl0."><span class="OiePBf-zPjgPe VYBDae-JX-UHGRz"></span><span class="bHC-Q" data-unbounded="false" jscontroller="LBaJxb" jsname="m9ZlFb" soy-skip="" ssk="6:RWVI5c"></span><span class="VYBDae-JX-ank-Rtc0Jf" jsname="S5tZuc" aria-hidden="true"><span class="bzc-ank" aria-hidden="true"><svg height="20" viewBox="0 -960 960 960" width="20" focusable="false" class=" aoH"><path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.717-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.162 50.85Q725.676-192 695.96-192H263.717Z"></path></svg></span></span><div class="VYBDae-JX-ano"></div></button><div class="ne2Ple-oshW8e-J9" id="tt-c78" role="tooltip" aria-hidden="true">Download</div></span></div></span></p></td><td style="border-left:0.75pt solid rgb(0,0,255);vertical-align:top;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"></p><div dir="ltr" align="left" style="margin-left:0pt"><table style="border:none;border-collapse:collapse"><colgroup><col width="315"></colgroup><tbody><tr style="height:41.25pt"><td style="vertical-align:top;padding:0pt 0pt 4pt 8pt;overflow:hidden"><p dir="ltr" style="line-height:2.25;margin-top:0pt;margin-bottom:0pt"><font color="#0000ff" face="Verdana"><span style="font-size:18.6667px"><b><i><span class="il">Mithilesh</span> <span class="il">K</span></i></b></span></font></p><p dir="ltr" style="line-height:2.25;margin-top:0pt;margin-bottom:0pt"><span style="font-size:10pt;font-family:Verdana;color:rgb(84,84,84);background-color:transparent;font-style:italic;vertical-align:baseline">Marketing - Head</span></p><p dir="ltr" style="line-height:2.25;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent;vertical-align:baseline;font-size:13.3333px"><font color="#545454" face="Verdana"><i>Vortex, NIT Trichy</i></font></span><span style="font-size:10pt;font-family:Verdana;color:rgb(84,84,84);background-color:transparent;font-style:italic;vertical-align:baseline">
            </span></p></td></tr><tr style="height:31.5pt"><td style="vertical-align:top;padding:4pt 0pt 4pt 8pt;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:10pt;font-family:Verdana;color:rgb(0,0,255);background-color:transparent;font-weight:700;font-style:italic;vertical-align:baseline">m:</span><span style="font-size:10pt;font-family:Verdana;color:rgb(84,84,84);background-color:transparent;font-style:italic;vertical-align:baseline"> +91 63806 94082</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:10pt;font-family:Verdana;color:rgb(0,0,255);background-color:transparent;font-weight:700;font-style:italic;vertical-align:baseline">e:</span><span style="font-size:10pt;font-family:Verdana;color:rgb(84,84,84);background-color:transparent;font-style:italic;vertical-align:baseline"> <a href="mailto:mithukriez2003@gmail.com" target="_blank">mithukriez2003@gmail.com</a></span></p></td></tr><tr style="height:19.5pt"><td style="vertical-align:top;padding:4pt 0pt 4pt 8pt;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"></p></td></tr><tr style="height:19.5pt"><td style="vertical-align:top;padding:4pt 0pt 4pt 8pt;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><a href="https://vortex.nitt.edu/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://vortex.nitt.edu/&amp;source=gmail&amp;ust=1707762087580000&amp;usg=AOvVaw3LKenqw3VrOfLWWUkgCHsw"><span style="font-size:10pt;font-family:Verdana;font-style:italic;vertical-align:baseline">https://vortex.nitt.edu/</span></a></p></td></tr><tr style="height:24.75pt"><td style="vertical-align:top;padding:4pt 0pt 4pt 8pt;overflow:hidden"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:10pt;font-family:Roboto,sans-serif;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:23px;height:23px"><a href="https://www.facebook.com/vortex.nitt/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/vortex.nitt/&amp;source=gmail&amp;ust=1707762087580000&amp;usg=AOvVaw0rtISLDsXrHApa4QRBN6kS"><img alt="facebook icon" src="https://lh3.googleusercontent.com/8OvSI0lpojSWy9X3EYO7flwBhZHGE61e0-joG-iJqB0nLSpd2jiwNRjrvWhdVZagb594uDA-AqgK1XTUv329l41Otz7dQsWUOTB820ec7J1zlaab6ux3mNPyAk9gezLAjjf26oMl" width="23" height="23" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0."></a></span></span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"> </span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:23px;height:23px"><a href="https://twitter.com/nitt_vortex" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/nitt_vortex&amp;source=gmail&amp;ust=1707762087580000&amp;usg=AOvVaw00W_nucFPgnN30_WRYdTd3"><img alt="twitter icon" src="https://lh6.googleusercontent.com/XoW8jRj8lP5vAO5qkHPXXkRJtGDIT23kESRYyVGYFwx9d-Y5a2564Ty43LE9BDhJlURuJEv7XtqjiF_xtZWRJTaeGPCx_me_s99mdbRlMl_hTA738G_-uQmHoziegjimh9mA2Fy2" width="23" height="23" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0."></a></span></span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"> </span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:23px;height:23px"><a href="https://www.linkedin.com/company/csea-nit-trichy/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/csea-nit-trichy/&amp;source=gmail&amp;ust=1707762087580000&amp;usg=AOvVaw1X9rLOkmSOUlqe0QTWHnbY"><img alt="linkedin icon" src="https://lh6.googleusercontent.com/D4JDnbE_kWHT154a4Iqz6OtoynGU7LFz9UPB71YTBiJYZdT9NnF-s9Lo4uspQl_HycYqyH1u0x0eWG-SkZpdFnYXvs3rSQ9aAxrVn7s_pyCTdtes8S2GMjlnyP2v227Ch5dayWag" width="23" height="23" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0."></a></span></span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"> </span><a href="https://www.instagram.com/vortex_nitt/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/vortex_nitt/&amp;source=gmail&amp;ust=1707762087580000&amp;usg=AOvVaw1az6YRKRRHuye2WRMJ4A6_"><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:23px;height:23px"><img alt="instagram icon" src="https://lh5.googleusercontent.com/VVMVJrq7xXAMkDfSbgRHQCC1_kinTNjaRdwXDtA9dqmlzIqbSrITxYtezOwpqntq0FO0hf3VZpZqysl2a-mLPmXkCy9j7jZgfHERNHAcYBqL56fXVflCvMTFsmXVnYA4bGjaq5lE" width="23" height="23" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0."></span></span><span style="font-size:10pt;font-family:Verdana;color:rgb(68,68,68);background-color:transparent;font-style:italic;vertical-align:baseline">&nbsp;</span></a></p></td></tr></tbody></table></div></td></tr></tbody></table></div><br><p style="line-height:1.38;margin-top:0pt;margin-bottom:10pt"><span style="font-size:11pt;font-family:Verdana;background-color:transparent;font-style:italic;vertical-align:baseline">Quantum Horizons!</span></p><br><img width="0" height="0" alt="" style="display:flex"></div>`,
            attachments: [
                { path: 'Vortex_Brochure.pdf' },
                { path: 'Sponsorship_Proposal.pdf' }
            ]
        }
        const rateLimitDelay = 60000; // Default to 60 seconds
        const batchcount = 3;
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(mailOptions);
        count++;
        console.log(`Mail Sent to ${company_name} -- Count - ${count}`);

        if (count % batchcount === 0) {
            let batch = count / batchcount;
            console.log(`\n Batch ${batch} complete, waiting for next batch...\n`);
            setTimeout(() => {
                process.nextTick();
            }, rateLimitDelay * 2);
        }

    } catch (err) {
        console.log("ERROR: ", err)
        console.log(`Mail didn't go to ${company_name} -- Count - ${count}`);

    }
};






const XLSX = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = XLSX.readFile('Trial.xlsx');

// Assuming the first sheet contains the data
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Define the column indices for company name and email address
const companyNameColumnIndex = 'A';
const emailAddressColumnIndex = 'B';

// Function to extract data from the specified column
function extractColumnData(sheet, columnIndex) {
    const columnData = [];
    for (let cellAddress in sheet) {
        if (cellAddress.startsWith(columnIndex)) {
            columnData.push(sheet[cellAddress].v);
        }
    }
    return columnData;
}

// Extract company names and email addresses
const companyNames = extractColumnData(sheet, companyNameColumnIndex);
const emailAddresses = extractColumnData(sheet, emailAddressColumnIndex);

// Combine the data into an array of objects if needed
const companyData = companyNames.map((name, index) => ({
    name,
    email: emailAddresses[index]
}));

const sendFromExcel = async () => {
    companyData.forEach(async cmp => {
        await sendMail(cmp.name, cmp.email);
    })
}

sendFromExcel();