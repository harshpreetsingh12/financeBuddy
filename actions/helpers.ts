import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const serializeTransation = (object: Record<string, any>)  => {
  const serialized = { ...object };
  if (object.balance) {
    serialized.balance = object.balance.toNumber();
  }

  if (object.amount) {
    serialized.amount = object.amount.toNumber();
  }

  return serialized;
};

export const isUserExist = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) return false;
    return user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};

export const serializedAmount = (object: Record<string, any>)  => ({
  ...object,
  amount: object.amount.toNumber(),
});
