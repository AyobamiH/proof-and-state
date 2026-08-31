export function responseJson(value, init = {}) {
  return new Response(JSON.stringify(value), { status: init.status ?? 200, headers: { "content-type": "application/json", ...(init.headers ?? {}) } });
}

export function baseJob(overrides = {}) {
  return {
    id: "job-20260831-001",
    brandId: "tail-wagging",
    channel: "google_business",
    copy: "Can Google tell where your pet-care business actually works?",
    storyAngle: "Kettering local-search clarity",
    scheduledAt: "2026-08-31T10:00:00.000Z",
    idempotencyKey: "tail-wagging:google:20260831:kettering-local-search",
    assetUrl: "https://res.cloudinary.com/dxj7qhlc4/image/upload/v1/tailwagging/post.png",
    destinationUrl: "https://tools.tailwaggingwebdesign.com/?utm_source=google",
    approval: { mode: "standing" },
    ...overrides,
  };
}
