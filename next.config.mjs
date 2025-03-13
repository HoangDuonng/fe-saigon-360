import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

import {env} from "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    images: {
        domains: [`${env.NEXT_PUBLIC_HOST}`, 'lh3.googleusercontent.com'],
    }
};


export default withNextIntl(nextConfig);
