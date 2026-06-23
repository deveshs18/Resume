/** @type {import('next').NextConfig} */

const repoName = "Resume"
const isGithubPages = process.env.GITHUB_PAGES === "true"
const basePath = isGithubPages ? `/${repoName}` : ""

const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
