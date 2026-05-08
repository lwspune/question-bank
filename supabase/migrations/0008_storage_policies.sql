-- Storage RLS for the question-images bucket.
-- Bucket is public, so SELECT is open by design (no policy needed; PostgREST
-- doesn't gate public-bucket reads). Writes/deletes are scoped to the caller's
-- own org folder and require ADMIN.

create policy "admin upload to own org folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_is_admin()
  );

create policy "admin update in own org folder"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_is_admin()
  )
  with check (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_is_admin()
  );

create policy "admin delete in own org folder"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_is_admin()
  );
