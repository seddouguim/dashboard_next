import jwt from "jsonwebtoken";

export function splitLastOccurrence(str, substring) {
  const lastIndex = str.lastIndexOf(substring);

  const before = str.slice(0, lastIndex);

  const after = str.slice(lastIndex + 1);

  return [before, after];
}

export const extractUsernameFromAccessToken = (accessToken) => {
  try {
    // Decode the access token
    const decodedToken = jwt.decode(accessToken, { complete: true });
    if (!decodedToken) {
      throw new Error("Failed to decode the access token");
    }

    // Extract the username from the decoded token
    const { payload } = decodedToken;
    const username = payload.username;
    if (!username) {
      throw new Error("Failed to extract the username from the access token");
    }

    return username;
  } catch (error) {
    console.error(error);
    return null;
  }
};
