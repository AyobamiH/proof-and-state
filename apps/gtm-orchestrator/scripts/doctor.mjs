const groups = {
  runtime: ["ORCHESTRATOR_ADMIN_TOKEN", "CLOUDINARY_CLOUD_NAME"],
  google_business: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_BUSINESS_ACCOUNT_ID", "GOOGLE_BUSINESS_LOCATION_ID"],
  linkedin: ["LINKEDIN_ACCESS_TOKEN", "LINKEDIN_ORGANIZATION_URN", "LINKEDIN_API_VERSION"],
  facebook: ["META_GRAPH_VERSION", "META_FACEBOOK_PAGE_ID", "META_PAGE_ACCESS_TOKEN"],
  instagram: ["META_GRAPH_VERSION", "META_INSTAGRAM_USER_ID", "META_INSTAGRAM_ACCESS_TOKEN"],
  threads: ["THREADS_API_VERSION", "META_THREADS_USER_ID", "META_THREADS_ACCESS_TOKEN"],
};

let missing = false;
for (const [group, names] of Object.entries(groups)) {
  const absent = names.filter((name) => !process.env[name]);
  console.log(`${group}: ${absent.length ? `blocked; missing ${absent.join(", ")}` : "configuration present (values not inspected)"}`);
  missing ||= absent.length > 0;
}
process.exitCode = missing ? 2 : 0;
