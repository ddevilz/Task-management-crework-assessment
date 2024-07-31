"use server";
import { cookies } from "next/headers";

export default async function getCookie() {
  const cookieStore = cookies();
  const token = await cookieStore.get("token");
  return token?.value;
}
