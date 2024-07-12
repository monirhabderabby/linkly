import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request, res: Response) {
  const user = await currentUser();
  const body = req.json();

  console.log(body);

  return Response.json(user?.id);
}
