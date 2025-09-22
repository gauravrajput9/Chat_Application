export const welcomeEmailTemplate = (userName, websiteUrl) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Chatify</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      text-align: center;
    }
    .header {
      background: linear-gradient(90deg, #4f46e5, #6366f1);
      color: #ffffff;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 20px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      background: linear-gradient(90deg, #4f46e5, #6366f1);
      transition: background 0.3s ease;
    }
    .btn:hover {
      background: linear-gradient(90deg, #4338ca, #4f46e5);
    }
    .footer {
      font-size: 12px;
      color: #888888;
      padding: 20px;
    }
    .footer a {
      color: #4f46e5;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .header h1 { font-size: 24px; }
      .btn { font-size: 14px; padding: 12px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Chatify, ${userName}!</h1>
    </div>
    <div class="content">
      <p>We’re thrilled to have you on board! Start exploring Chatify and enjoy seamless chat experiences with your friends and colleagues.</p>
      <a href="${websiteUrl}" class="btn">Get Started</a>
    </div>
    <div class="footer">
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p>© ${new Date().getFullYear()} Chatify. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
