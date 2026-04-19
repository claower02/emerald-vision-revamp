-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger function
create or replace function public.set_updated_at()
returns trigger language plpgsql
set search_path = public
as $$
begin new.updated_at = now(); return new; end; $$;

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.categories enable row level security;
create policy "Public read categories" on public.categories for select using (true);
create policy "Admins manage categories" on public.categories for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger categories_updated before update on public.categories
  for each row execute function public.set_updated_at();

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  price_text text,
  image_url text,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.products enable row level security;
create policy "Public read products" on public.products for select using (true);
create policy "Admins manage products" on public.products for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- Leads
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 3 and 40),
  email text check (email is null or char_length(email) <= 255),
  message text check (message is null or char_length(message) <= 2000),
  status text default 'new',
  created_at timestamptz default now()
);
alter table public.leads enable row level security;
create policy "Anyone can submit lead" on public.leads for insert with check (true);
create policy "Admins read leads" on public.leads for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update leads" on public.leads for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete leads" on public.leads for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Site content
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
alter table public.site_content enable row level security;
create policy "Public read site_content" on public.site_content for select using (true);
create policy "Admins manage site_content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger site_content_updated before update on public.site_content
  for each row execute function public.set_updated_at();

-- Storage bucket
insert into storage.buckets (id, name, public) values ('catalog', 'catalog', true)
  on conflict (id) do nothing;
create policy "Public read catalog images" on storage.objects for select
  using (bucket_id = 'catalog');
create policy "Admins upload catalog images" on storage.objects for insert to authenticated
  with check (bucket_id = 'catalog' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update catalog images" on storage.objects for update to authenticated
  using (bucket_id = 'catalog' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete catalog images" on storage.objects for delete to authenticated
  using (bucket_id = 'catalog' and public.has_role(auth.uid(), 'admin'));