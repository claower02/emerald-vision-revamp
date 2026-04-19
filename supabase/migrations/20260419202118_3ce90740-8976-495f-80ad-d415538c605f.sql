-- Tighten leads insert policy with explicit checks (still public submit, but validated)
drop policy if exists "Anyone can submit lead" on public.leads;
create policy "Public can submit valid lead" on public.leads
  for insert
  with check (
    char_length(name) between 1 and 120
    and char_length(phone) between 3 and 40
    and (email is null or char_length(email) <= 255)
    and (message is null or char_length(message) <= 2000)
  );

-- Restrict public listing of storage bucket: only allow SELECT for objects whose name starts with 'public/'
drop policy if exists "Public read catalog images" on storage.objects;
create policy "Public read catalog public folder" on storage.objects
  for select
  using (bucket_id = 'catalog' and (storage.foldername(name))[1] = 'public');