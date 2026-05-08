import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const member = await getSessionMember();
  if (member) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {member.user.email}</CardTitle>
            <CardDescription>
              Organization: <span className="font-medium">{member.orgName}</span>
              {" · "}
              Role: <span className="font-medium">{member.role}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/browse">Browse questions</Link>
              </Button>
              {member.role === "ADMIN" && (
                <Button asChild>
                  <Link href="/upload">Upload questions</Link>
                </Button>
              )}
            </div>
            <SignOutButton />
          </CardContent>
        </Card>
      </main>
    );
  }

  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>Account not linked to an organization</CardTitle>
          <CardDescription>
            You are signed in as <span className="font-medium">{user.email}</span>,
            but you have not been added to any organization yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Ask your administrator to add you, then refresh this page.
          </p>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
