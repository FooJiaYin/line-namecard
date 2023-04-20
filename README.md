# MINE Card

Create and share your namecard in LINE within minutes.

- Made with: LIFF, NextJS, React
- Demo: https://line-namecard.netlify.app/

## Development

### Prerequisites
- Node.js <= 16.20.0
- npm 
- yarn (optional) 

### Installation & Setup
1. Install dependencies
    ```bash
    npm install
    # or
    yarn
    ```
2. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Deployment 
- [Deploy on netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)
- [Deploy on Vercel](https://vercel.com/docs/concepts/deployments/git#deploying-a-git-repository)

### Registering LIFF App
To enable Line login and sending messages, you need to register a LIFF app in the LINE Developer Console.

1. Create a LINE Provider - [LINE Official Guide](https://developers.line.biz/en/docs/liff/getting-started/)
2. Create a LINE Login Channel - [LINE Official Guide](https://developers.line.biz/en/docs/line-login/getting-started/)
3. Add the LIFF app to the channel - [LINE Official Guide](https://developers.line.biz/en/docs/liff/registering-liff-apps/)

### Environment Variables
Edit `.env.local` file in the root directory of the project.
```env
LIFF_ID = "Your LIFF ID which is aquired from LINE Dev Center"
LIFF_URL = "Domain url of the app, eg: https://line-namecard.netlify.app"
```
- [How to add environment variables in local development](https://nextjs.org/docs/basic-features/environment-variables)
- [How to add environment variables to Netlify](https://docs.netlify.com/environment-variables/get-started/)
- [How to add environment variables to Vercel](https://vercel.com/guides/how-to-add-vercel-environment-variables)

## Resources
- [LIFF v2 API Reference](https://developers.line.biz/en/reference/liff/)
- [Flex Message API Reference](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)

## Acknowledgements
This project was inspired by and built based on the following projects:
- [LIFF Starter](https://github.com/line/line-liff-v2-starter)
- [LINE 數位版名片 liff-businesscard](https://github.com/taichunmin/liff-businesscard)
- [react-liff](https://github.com/epaew/react-liff/) - A react context provider for LIFF
- [flex2html - Convert LINE Flex message to HTML](https://github.com/PamornT/flex2html)