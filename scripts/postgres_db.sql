CREATE TABLE IF NOT EXISTS public.url
(
    id text NOT NULL,
    value text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.url
    OWNER to unbelt;
