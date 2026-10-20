import { profile } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

const validIds = new Set(profile.links.map((link) => link.id));

export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return Response.json({ skipped: true, reason: "MONGODB_URI not set" });
  }

  const client = await clientPromise;
  await client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ _id: string; count: number }>("clicks")
    .updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });

  return Response.json({ ok: true });
}
