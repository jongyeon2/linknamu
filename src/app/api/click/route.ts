import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number };

const linkIds = profile.links.map((link) => link.id);
const validIds = new Set(linkIds);

function getClicksCollection(client: Awaited<NonNullable<ReturnType<typeof getMongoClient>>>) {
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<ClickDoc>("clicks");
}

// 모든 링크의 현재 클릭 수를 { [linkId]: count } 형태로 한 번에 반환합니다.
export async function GET() {
  // MONGODB_URI가 없을 때 빌드 시점에 0으로 고정된 응답이 만들어지지 않도록 항상 요청 시점에 실행합니다.
  await connection();

  const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));

  const clientPromise = getMongoClient();
  if (clientPromise) {
    const docs = await getClicksCollection(await clientPromise)
      .find({ _id: { $in: linkIds } })
      .toArray();
    for (const doc of docs) counts[doc._id] = doc.count;
  }

  return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
}

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

  await getClicksCollection(await clientPromise).updateOne(
    { _id: linkId },
    { $inc: { count: 1 } },
    { upsert: true },
  );

  return Response.json({ ok: true });
}
