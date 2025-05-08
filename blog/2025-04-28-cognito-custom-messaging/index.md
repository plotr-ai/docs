---
slug: cognito-custom-messaging
title: Building Custom Email (and SMS) Workflows for AWS Cognito with Lambda
authors: [stewart]
tags: [cognito, lambda, custom-messaging, email, sms]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Building Custom Email (and SMS) Workflows for AWS Cognito with Lambda

AWS Cognito makes it easy to handle sign‑up, password resets, multi‑factor auth, and more—but the out‑of‑the‑box messages are pretty plain. With a single Lambda "CustomMessage" trigger you can own every email and SMS your users see, rebranding them to match your product's look & feel and adding rich HTML, buttons, inlined styles, or even multi‑language support.

:::info What We'll Cover
1. **Explain Cognito's CustomMessage trigger**
2. **Scaffold a Lambda project** (TypeScript or JavaScript)
3. **Walk through handler code** for all the common email types
4. **Deploy and wire up** the trigger to your User Pool
5. **Test and iterate** on your templates
6. Share best‑practices for maintainable, localized messaging
:::

## 1. What Is the "CustomMessage" Trigger?

When you enable the CustomMessage trigger on your Cognito User Pool, every time Cognito needs to send an email or SMS—for sign‑up verification, forgotten‑password, admin‑created users, code resends, attribute updates—you can intercept it in a Lambda and override:

* **emailSubject**
* **emailMessage** (HTML or plain text)
* **smsMessage** (text‑only fallback)

:::tip Available Trigger Sources
Based on the `event.triggerSource` you can craft completely different templates for:

- `CustomMessage_SignUp`
- `CustomMessage_ForgotPassword`
- `CustomMessage_AdminCreateUser`
- `CustomMessage_ResendCode`
- `CustomMessage_UpdateUserAttribute`
:::

Cognito then uses what you set on `event.response` instead of its defaults.

## 2. Scaffolding the Lambda Project

### Prerequisites

:::caution Before You Begin
Make sure you have:
* AWS CLI or Console access with permissions to create Lambda & Cognito triggers
* Node.js ≥ 14 (or your preferred runtime)
* A Cognito User Pool already in place
:::

### Project Setup

<Tabs>
  <TabItem value="npm" label="NPM" default>
```bash
mkdir cognito-custom-messages
cd cognito-custom-messages
npm init -y
npm install aws-lambda
npm install --save-dev typescript @types/aws-lambda
```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
```bash
mkdir cognito-custom-messages
cd cognito-custom-messages
yarn init -y
yarn add aws-lambda
yarn add -D typescript @types/aws-lambda
```
  </TabItem>
</Tabs>

Create a basic `tsconfig.json`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

Your folder tree should look like this:

```text
cognito-custom-messages/
├─ src/
│  └─ handler.ts
├─ tsconfig.json
└─ package.json
```

## 3. Writing the Handler

In **src/handler.ts**, import the Cognito event type and craft your HTML templates. Here's a generic, brand‑agnostic example:

```typescript title="src/handler.ts" {1,4-10}
import { CustomMessageTriggerEvent, Context, Callback } from 'aws-lambda';

// You can also load these from environment variables or a config file
const BRAND = {
  name: 'YourAppName',
  logoUrl: 'https://yourcdn.com/logo.png',
  accentColor: '#1E88E5',
  baseColor: '#1565C0',
  supportEmail: 'support@yourapp.com',
};

export const handler = async (
  event: CustomMessageTriggerEvent,
  context: Context
): Promise<CustomMessageTriggerEvent> => {
  console.log('Incoming CustomMessage event:', JSON.stringify(event, null, 2));

  // Header / footer can be extracted to functions or external files
  const header = `
    <div style="font-family: sans-serif; max-width:600px; margin:auto;">
      <img src="${BRAND.logoUrl}" alt="${BRAND.name}" style="width:100px; margin-bottom:20px;" />
  `;
  const footer = `
      <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.</p>
      <p style="font-size:12px; color:#888;">
        Need help? <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.accentColor}; text-decoration:none;">${BRAND.supportEmail}</a>
      </p>
    </div>
  `;

  // Helper to wrap a code in a styled box
  const renderCode = (code: string) => `
    <div style="background:#f4f4f4; padding:16px; border-radius:8px; text-align:center; margin:20px 0;">
      <code style="font-size:1.5em; letter-spacing:4px;">${code}</code>
    </div>
  `;

  const { triggerSource, request, response } = event;
  const code = request.codeParameter;
  const user = request.usernameParameter ?? event.userName;

  switch (triggerSource) {
    case 'CustomMessage_SignUp':
      response.emailSubject = `Welcome to ${BRAND.name}! Confirm your address`;
      response.emailMessage = `
        ${header}
        <h2 style="color:${BRAND.baseColor};">Hello, and thanks for joining ${BRAND.name}!</h2>
        <p>Please confirm your email by entering the code below:</p>
        ${renderCode(code!)}
        <p>If you didn't sign up, simply ignore this email.</p>
        ${footer}
      `;
      response.smsMessage = `Your ${BRAND.name} signup code is: ${code}`;
      break;

    case 'CustomMessage_ForgotPassword':
      response.emailSubject = `${BRAND.name} Password Reset`;
      response.emailMessage = `
        ${header}
        <h2 style="color:${BRAND.baseColor};">Password Reset Requested</h2>
        <p>Use the code below to reset your password:</p>
        ${renderCode(code!)}
        <p>If you didn't request this, please ignore.</p>
        ${footer}
      `;
      response.smsMessage = `${BRAND.name} reset code: ${code}`;
      break;

    case 'CustomMessage_AdminCreateUser':
      response.emailSubject = `${BRAND.name} — Your new account`;
      response.emailMessage = `
        ${header}
        <h2 style="color:${BRAND.baseColor};">Your account is ready!</h2>
        <p>Username: <strong>${user}</strong></p>
        <p>Temporary password:</p>
        ${renderCode(code!)}
        <p>Please sign in and set a new password.</p>
        ${footer}
      `;
      response.smsMessage = `Welcome to ${BRAND.name}! Username: ${user}, Temp password: ${code}`;
      break;

    // …and similarly for ResendCode & UpdateUserAttribute…
  }

  return event;
};
```

:::tip Template Organization
Keep your HTML snippets modular—load headers, footers, and translations from separate files or S3 if you need localization.
:::

## 4. Packaging & Deployment

<Tabs>
  <TabItem value="serverless" label="Serverless Framework" default>

```yaml title="serverless.yml"
service: cognito-custom-messages

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    BRAND_NAME: ${env:BRAND_NAME}
    BRAND_LOGO: ${env:BRAND_LOGO}

functions:
  customMessage:
    handler: dist/handler.handler
    memorySize: 128
    timeout: 10
    events:
      - cognitoUserPool:
          pool: YourUserPool
          trigger: CustomMessage
```

  </TabItem>
  <TabItem value="sam" label="AWS SAM">

```yaml title="template.yml"
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  CustomMessageFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: dist/handler.handler
      Runtime: nodejs18.x
      MemorySize: 128
      Timeout: 10
```

  </TabItem>
</Tabs>

Then deploy:

```bash
npx sls deploy
```

## 5. Hooking It Up in Cognito

:::info Setup Steps
1. In the AWS Console, go to **Cognito → User Pools → YourPool → Triggers**
2. Under **CustomMessage**, select the Lambda you just deployed
3. Save and test by creating a new user or invoking the trigger via the CLI
:::

Test using AWS CLI:

```bash
aws cognito-idp admin-create-user \
  --user-pool-id YOUR_POOL_ID \
  --username testuser \
  --message-action SUPPRESS
```

:::tip Debugging
Check CloudWatch logs for your Lambda's console output to verify everything is working correctly.
:::

## 6. Testing & Iteration

* **Automated tests**: Simulate event payloads locally or in CI to verify your HTML renders without errors
* **Preview links**: In your email templates, include a "View in browser" link back to an S3‑hosted HTML preview
* **Fallback SMS**: Always set `response.smsMessage`, since not all users accept HTML email

## 7. Best Practices

:::info Key Recommendations
* **Environment variables** (or secrets): store branding, support contacts, and links outside of code
* **Localization**: extract all copy into JSON/YAML files and select by `event.request.userAttributes.locale`
* **Version your templates**: consider a "templateVersion" user attribute so you can A/B test designs over time
* **Error handling**: wrap your switch in try/catch and log details so you don't break the Cognito flow
* **Accessibility**: use semantic HTML, alt text on images, and sufficient color contrast
:::

## Conclusion

With just one Lambda and a handful of `triggerSource` cases, you can transform your Cognito emails and SMS into on‑brand, accessible, and engaging messages. Whether you're running a growth campaign, supporting multiple languages, or simply want a nicer "forgot password" flow, this pattern scales to any use case.

:::note Next Steps
* Review the [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-message.html) for more details
* Check out our other AWS authentication guides
* Join our community to share your custom templates
:::

Happy coding—and happy customizing!
