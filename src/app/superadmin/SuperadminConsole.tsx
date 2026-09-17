"use client";

import { useState } from "react";
import SuperadminClient from "./SuperadminClient";
import TeacherRequests from "./TeacherRequests";
import ContactMessages from "./ContactMessages";
import SuperadminTabs from "./SuperadminTabs";
import { countNew } from "@/lib/superadmin/tabs";
import type { OrgStat } from "@/lib/superadmin/admin";
import type { TeacherRequest } from "@/lib/teacherAccess/service";
import type { ContactMessage } from "@/lib/contact/service";

/**
 * Client shell holding the tab strip's unread counts.
 *
 * WHY THIS EXISTS RATHER THAN counts COMPUTED IN page.tsx: each queue owns its
 * rows in local state and updates them optimistically on triage. A count derived
 * server-side would freeze at page load, so marking the last message read would
 * leave a stale "1" on the tab — the badge would then be lying about the exact
 * thing it exists to report. The queues push their live count up instead.
 *
 * Seeded from the server data so the FIRST render's badges are already correct,
 * before any child effect has run.
 */
export default function SuperadminConsole({
  orgs,
  teacherRequests,
  contactMessages,
}: {
  orgs: OrgStat[];
  teacherRequests: TeacherRequest[];
  contactMessages: ContactMessage[];
}) {
  const [teacherNew, setTeacherNew] = useState(() => countNew(teacherRequests));
  const [contactNew, setContactNew] = useState(() => countNew(contactMessages));

  return (
    <SuperadminTabs
      counts={{ teachers: teacherNew, contact: contactNew }}
      panels={{
        orgs: <SuperadminClient initialOrgs={orgs} />,
        teachers: (
          <TeacherRequests initial={teacherRequests} onOpenCountChange={setTeacherNew} />
        ),
        contact: (
          <ContactMessages initial={contactMessages} onOpenCountChange={setContactNew} />
        ),
      }}
    />
  );
}
