/**
 * POST /api/publish
 *
 * Server-side API route that commits updated propertyData.js to GitHub.
 * The GITHUB_TOKEN is read from the server environment variable set in Vercel,
 * so it is NEVER exposed to the client/browser.
 *
 * Request body: { content: string } — the full JS source of propertyData.js
 * Response: { success: true, sha: string } or { error: string }
 */

export async function POST(request) {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return Response.json(
        { error: "GITHUB_TOKEN is not configured on the server. Add it in Vercel → Settings → Environment Variables." },
        { status: 500 }
      );
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return Response.json(
        { error: "Missing or invalid 'content' in request body." },
        { status: 400 }
      );
    }

    const owner = "PriyanshuChaudhry";
    const repo = "Chaudhary-Villa";
    const branch = "main";
    const filePath = "src/data/propertyData.js";

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

    // 1. Fetch current file SHA (required by GitHub API for updates)
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!getRes.ok) {
      const errText = await getRes.text();
      return Response.json(
        { error: `GitHub API error (${getRes.status}): ${getRes.statusText}. ${errText}` },
        { status: getRes.status }
      );
    }

    const fileData = await getRes.json();
    const currentSha = fileData.sha;

    // 2. Encode content as Base64
    const base64Content = Buffer.from(content, "utf-8").toString("base64");

    // 3. Commit updated file
    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "chore: update property data via owner admin panel",
          content: base64Content,
          sha: currentSha,
          branch: branch,
        }),
      }
    );

    if (!putRes.ok) {
      const errJson = await putRes.json();
      return Response.json(
        { error: errJson.message || `Failed to commit (${putRes.status})` },
        { status: putRes.status }
      );
    }

    const result = await putRes.json();

    return Response.json({
      success: true,
      sha: result.commit?.sha?.slice(0, 7) || "unknown",
    });
  } catch (err) {
    console.error("Publish API error:", err);
    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
