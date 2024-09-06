--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

-- Started on 2024-09-05 23:50:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 21410)
-- Name: basket_shawarmas; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.basket_shawarmas (
    quantity integer DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "basketId" integer NOT NULL,
    "shawarmaId" integer NOT NULL
);


ALTER TABLE public.basket_shawarmas OWNER TO portfolio;

--
-- TOC entry 218 (class 1259 OID 21357)
-- Name: baskets; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.baskets (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.baskets OWNER TO portfolio;

--
-- TOC entry 217 (class 1259 OID 21356)
-- Name: baskets_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.baskets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.baskets_id_seq OWNER TO portfolio;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 217
-- Name: baskets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.baskets_id_seq OWNED BY public.baskets.id;


--
-- TOC entry 220 (class 1259 OID 21364)
-- Name: categories; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO portfolio;

--
-- TOC entry 219 (class 1259 OID 21363)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO portfolio;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 224 (class 1259 OID 21393)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    name character varying(255),
    image character varying(255),
    price double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ingredients OWNER TO portfolio;

--
-- TOC entry 223 (class 1259 OID 21392)
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredients_id_seq OWNER TO portfolio;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 223
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- TOC entry 235 (class 1259 OID 21469)
-- Name: order_items; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    weight integer NOT NULL,
    price character varying(255) NOT NULL,
    cake character varying(255) DEFAULT 'USUAL'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderId" integer,
    title character varying(255) NOT NULL,
    count integer NOT NULL,
    "addedComponentsList" text NOT NULL,
    "removedComponentsList" text NOT NULL
);


ALTER TABLE public.order_items OWNER TO portfolio;

--
-- TOC entry 234 (class 1259 OID 21468)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO portfolio;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 234
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 233 (class 1259 OID 21452)
-- Name: orders; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    phone character varying(255) NOT NULL,
    amount character varying(255) NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    comment text,
    payment character varying(255) DEFAULT 'CASH'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "userName" character varying(255) NOT NULL,
    "waitingTime" integer DEFAULT 15 NOT NULL
);


ALTER TABLE public.orders OWNER TO portfolio;

--
-- TOC entry 232 (class 1259 OID 21451)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO portfolio;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 232
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 226 (class 1259 OID 21402)
-- Name: sauces; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.sauces (
    id integer NOT NULL,
    name character varying(255),
    image character varying(255),
    price double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.sauces OWNER TO portfolio;

--
-- TOC entry 225 (class 1259 OID 21401)
-- Name: sauces_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.sauces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sauces_id_seq OWNER TO portfolio;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 225
-- Name: sauces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.sauces_id_seq OWNED BY public.sauces.id;


--
-- TOC entry 231 (class 1259 OID 21439)
-- Name: shawarma_components; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.shawarma_components (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    necessity boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "shawarmaId" integer
);


ALTER TABLE public.shawarma_components OWNER TO portfolio;

--
-- TOC entry 230 (class 1259 OID 21438)
-- Name: shawarma_components_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.shawarma_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shawarma_components_id_seq OWNER TO portfolio;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 230
-- Name: shawarma_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.shawarma_components_id_seq OWNED BY public.shawarma_components.id;


--
-- TOC entry 237 (class 1259 OID 21801)
-- Name: shawarma_from_baskets; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.shawarma_from_baskets (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "basketId" integer,
    "uniqueShawaKey" text NOT NULL,
    "shawarmaId" integer NOT NULL,
    title character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    weight integer NOT NULL,
    price character varying(255) NOT NULL,
    cake character varying(255) NOT NULL,
    count integer DEFAULT 1,
    "addedComponentsList" text NOT NULL,
    "removedComponentsList" text NOT NULL
);


ALTER TABLE public.shawarma_from_baskets OWNER TO portfolio;

--
-- TOC entry 236 (class 1259 OID 21800)
-- Name: shawarma_from_baskets_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.shawarma_from_baskets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shawarma_from_baskets_id_seq OWNER TO portfolio;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 236
-- Name: shawarma_from_baskets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.shawarma_from_baskets_id_seq OWNED BY public.shawarma_from_baskets.id;


--
-- TOC entry 229 (class 1259 OID 21427)
-- Name: shawarma_props; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.shawarma_props (
    id integer NOT NULL,
    weight integer NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "shawarmaId" integer
);


ALTER TABLE public.shawarma_props OWNER TO portfolio;

--
-- TOC entry 228 (class 1259 OID 21426)
-- Name: shawarma_props_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.shawarma_props_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shawarma_props_id_seq OWNER TO portfolio;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 228
-- Name: shawarma_props_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.shawarma_props_id_seq OWNED BY public.shawarma_props.id;


--
-- TOC entry 222 (class 1259 OID 21373)
-- Name: shawarmas; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.shawarmas (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    icon character varying(255),
    novelty boolean DEFAULT false,
    presence boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "categoryId" integer
);


ALTER TABLE public.shawarmas OWNER TO portfolio;

--
-- TOC entry 221 (class 1259 OID 21372)
-- Name: shawarmas_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.shawarmas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shawarmas_id_seq OWNER TO portfolio;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 221
-- Name: shawarmas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.shawarmas_id_seq OWNED BY public.shawarmas.id;


--
-- TOC entry 216 (class 1259 OID 21345)
-- Name: users; Type: TABLE; Schema: public; Owner: portfolio
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO portfolio;

--
-- TOC entry 215 (class 1259 OID 21344)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: portfolio
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO portfolio;

--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: portfolio
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4744 (class 2604 OID 21360)
-- Name: baskets id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.baskets ALTER COLUMN id SET DEFAULT nextval('public.baskets_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 21367)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 21396)
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 21472)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4755 (class 2604 OID 21455)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4750 (class 2604 OID 21405)
-- Name: sauces id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.sauces ALTER COLUMN id SET DEFAULT nextval('public.sauces_id_seq'::regclass);


--
-- TOC entry 4753 (class 2604 OID 21442)
-- Name: shawarma_components id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_components ALTER COLUMN id SET DEFAULT nextval('public.shawarma_components_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 21804)
-- Name: shawarma_from_baskets id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_from_baskets ALTER COLUMN id SET DEFAULT nextval('public.shawarma_from_baskets_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 21430)
-- Name: shawarma_props id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_props ALTER COLUMN id SET DEFAULT nextval('public.shawarma_props_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 21376)
-- Name: shawarmas id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas ALTER COLUMN id SET DEFAULT nextval('public.shawarmas_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 21348)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5047 (class 0 OID 21410)
-- Dependencies: 227
-- Data for Name: basket_shawarmas; Type: TABLE DATA; Schema: public; Owner: portfolio
--



--
-- TOC entry 5038 (class 0 OID 21357)
-- Dependencies: 218
-- Data for Name: baskets; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.baskets (id, "createdAt", "updatedAt", "userId") VALUES (4, '2024-07-19 12:26:09.078+03', '2024-07-19 12:26:09.078+03', 10);
INSERT INTO public.baskets (id, "createdAt", "updatedAt", "userId") VALUES (71, '2024-08-14 23:39:20.556+03', '2024-08-14 23:39:20.556+03', 79);
INSERT INTO public.baskets (id, "createdAt", "updatedAt", "userId") VALUES (15, '2024-07-19 18:53:46.308+03', '2024-07-19 18:53:46.308+03', 22);
INSERT INTO public.baskets (id, "createdAt", "updatedAt", "userId") VALUES (24, '2024-07-21 13:28:00.148+03', '2024-07-21 13:28:00.148+03', 32);


--
-- TOC entry 5040 (class 0 OID 21364)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (4, 'Сыр', '2024-05-27 20:22:43.397+03', '2024-05-27 20:22:43.397+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (3, ' Говядина', '2024-05-27 20:22:37.119+03', '2024-06-10 19:55:11.75+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (0, 'Все', '2024-05-27 20:22:18.045+03', '2024-05-27 20:22:18.045+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (1, 'Новинки', '2024-06-10 19:55:43.332+03', '2024-06-10 19:55:43.332+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (2, 'Курица', '2024-05-27 20:22:18.045+03', '2024-05-27 20:22:18.045+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (5, 'Бекон', '2024-05-27 21:46:40.871+03', '2024-08-18 02:54:11.04+03');
INSERT INTO public.categories (id, name, "createdAt", "updatedAt") VALUES (15, 'Вегетарианская', '2024-09-04 20:25:59.442+03', '2024-09-04 20:25:59.442+03');


--
-- TOC entry 5044 (class 0 OID 21393)
-- Dependencies: 224
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.ingredients (id, name, image, price, "createdAt", "updatedAt") VALUES (2, 'Картофель фри', 'a0d1ea13-0f9e-4109-857f-1f6ef77240c7.svg', 1.2, '2024-06-09 12:28:37.565+03', '2024-06-09 12:28:37.565+03');
INSERT INTO public.ingredients (id, name, image, price, "createdAt", "updatedAt") VALUES (4, 'Сыр', '00a113f2-ceff-42d4-9204-18782e17786a.svg', 1.2, '2024-06-09 12:31:37.342+03', '2024-06-09 12:31:37.342+03');
INSERT INTO public.ingredients (id, name, image, price, "createdAt", "updatedAt") VALUES (5, 'Морковка', '7867226d-6a54-4cb1-b319-0344dd6bd00f.svg', 1.3, '2024-06-09 13:43:04.265+03', '2024-06-09 13:43:04.265+03');
INSERT INTO public.ingredients (id, name, image, price, "createdAt", "updatedAt") VALUES (6, 'Свежий огурец', '8d9e0f89-55bb-451b-a84c-ed8c06da0134.svg', 1.2, '2024-06-09 15:00:25.796+03', '2024-06-09 15:01:11.359+03');
INSERT INTO public.ingredients (id, name, image, price, "createdAt", "updatedAt") VALUES (7, 'Грибы', '197e6fdf-e618-4e6a-815d-1b3663c85c81.svg', 1.2, '2024-09-01 21:22:25.007+03', '2024-09-01 21:22:25.007+03');


--
-- TOC entry 5055 (class 0 OID 21469)
-- Dependencies: 235
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (13, 650, '18,10', 'Сырная лепешка', '2024-07-27 23:28:09.84+03', '2024-07-27 23:28:09.84+03', 8, 'чикен', 2, '[{"id":3,"name":"Грибы","count":1,"price":1.2},{"id":9,"name":"Горчичный соус","count":2,"price":1.2},{"id":1,"name":"Чили соус","count":2,"price":1.2}]', '["Красный соус"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (14, 400, '8,90', 'Обычная лепешка', '2024-07-27 23:28:09.843+03', '2024-07-27 23:28:09.843+03', 8, 'стартер', 3, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (15, 550, '14,60', 'Сырная лепешка', '2024-07-28 01:17:36.329+03', '2024-07-28 01:17:36.329+03', 10, 'бекон', 2, '[{"id":5,"name":"Морковка","count":1,"price":1.3},{"id":3,"name":"Сырный соус","count":2,"price":1.2}]', '["Капуста"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (16, 400, '8,90', 'Обычная лепешка', '2024-07-28 01:17:36.33+03', '2024-07-28 01:17:36.33+03', 10, 'крем чиз', 3, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (39, 300, '5,90', 'Обычная лепешка', '2024-08-11 20:35:16.123+03', '2024-08-11 20:35:16.123+03', 22, 'чикен', 1, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (40, 300, '5,90', 'Обычная лепешка', '2024-08-12 21:17:25.389+03', '2024-08-12 21:17:25.389+03', 23, 'чикен', 1, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (41, 300, '5,90', 'Обычная лепешка', '2024-08-13 21:37:28.284+03', '2024-08-13 21:37:28.284+03', 24, 'чикен', 3, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (42, 650, '18,10', 'Сырная лепешка', '2024-08-13 21:37:28.288+03', '2024-08-13 21:37:28.288+03', 24, 'чикен', 2, '[{"id":2,"name":"Картофель фри","count":2,"price":1.2},{"id":3,"name":"Грибы","count":1,"price":1.2},{"id":5,"name":"Терияки соус","count":3,"price":1.2}]', '["Капуста","Красный соус"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (43, 550, '13,30', 'Обычная лепешка', '2024-08-13 21:37:28.292+03', '2024-08-13 21:37:28.292+03', 24, 'крем чиз', 3, '[{"id":4,"name":"Сыр","count":1,"price":1.2},{"id":7,"name":"Цезарь соус","count":1,"price":1.2}]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (44, 550, '10,90', 'Обычная лепешка', '2024-08-13 21:37:28.295+03', '2024-08-13 21:37:28.295+03', 24, 'бекон', 1, '[]', '["Красный соус"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (45, 550, '10,90', 'Обычная лепешка', '2024-08-13 21:37:28.299+03', '2024-08-13 21:37:28.299+03', 24, 'крем чиз', 1, '[]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (53, 400, '9,10', 'Обычная лепешка', '2024-09-04 19:55:24.054+03', '2024-09-04 19:55:24.054+03', 29, 'чикен', 1, '[{"id":2,"name":"Картофель фри","count":1,"price":1.2}]', '[]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (54, 300, '9,50', 'Сырная лепешка', '2024-09-04 19:55:24.058+03', '2024-09-04 19:55:24.058+03', 29, 'чикен', 1, '[{"id":2,"name":"Картофель фри","count":1,"price":1.2},{"id":4,"name":"Сыр","count":1,"price":1.2},{"id":6,"name":"Чесночный соус","count":1,"price":1.2}]', '["Помидор"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (55, 550, '18,20', 'Сырная лепешка', '2024-09-05 18:27:41.354+03', '2024-09-05 18:27:41.354+03', 30, 'бекон', 2, '[{"id":2,"name":"Картофель фри","count":2,"price":1.2},{"id":4,"name":"Сыр","count":1,"price":1.2},{"id":5,"name":"Морковка","count":1,"price":1.3},{"id":7,"name":"Цезарь соус","count":1,"price":1.2},{"id":10,"name":"Хумус","count":1,"price":1.2}]', '["Свежий огурец","Помидор","Красный соус"]');
INSERT INTO public.order_items (id, weight, price, cake, "createdAt", "updatedAt", "orderId", title, count, "addedComponentsList", "removedComponentsList") VALUES (56, 550, '10,90', 'Обычная лепешка', '2024-09-05 18:27:41.359+03', '2024-09-05 18:27:41.359+03', 30, 'бёрпи', 1, '[]', '[]');


--
-- TOC entry 5053 (class 0 OID 21452)
-- Dependencies: 233
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (22, '+375(65) 656-56-56', '5,90', 1, NULL, 'CARD', '2024-08-11 20:35:16.111+03', '2024-08-11 20:35:16.111+03', 22, 'vadim', 20);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (24, '+375(65) 656-56-56', '115,60', 1, 'I want hot shawarmas', 'CASH', '2024-08-13 21:37:28.245+03', '2024-09-01 20:53:15.746+03', 22, 'Peter', 30);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (8, '+375331258876', '62,90', 1, 'With beer', 'CASH', '2024-07-27 23:28:09.835+03', '2024-09-01 20:56:59.349+03', 22, 'Pete', 15);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (10, '+375(29)188-18-88', '55,90', 0, 'I want good shawa', 'CASH', '2024-07-28 01:17:36.326+03', '2024-09-01 20:57:03.305+03', 22, 'Pete', 20);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (23, '+375(65) 656-56-56', '5,90', 0, NULL, 'CARD', '2024-08-12 21:17:25.371+03', '2024-08-31 17:37:46.679+03', 22, 'vadim', 20);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (29, '+375(65) 656-56-56', '18,60', 0, NULL, 'CARD', '2024-09-04 19:55:24.047+03', '2024-09-04 19:55:24.047+03', 10, 'vadim', 20);
INSERT INTO public.orders (id, phone, amount, status, comment, payment, "createdAt", "updatedAt", "userId", "userName", "waitingTime") VALUES (30, '+375(65) 656-56-56', '47,30', 0, 'sdvfdfbdfbdfb', 'CARD', '2024-09-05 18:27:41.311+03', '2024-09-05 18:27:41.311+03', 10, 'vadim', 20);


--
-- TOC entry 5046 (class 0 OID 21402)
-- Dependencies: 226
-- Data for Name: sauces; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (9, 'Горчичный соус', '3d55542c-813f-4c63-80f5-749fef82cdc6.webp', 1.2, '2024-06-09 17:37:10.032+03', '2024-06-09 17:37:10.032+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (1, 'Чили соус', '2d7b1fda-c5c4-4d40-bd56-86b0bde19bc4.webp', 1.2, '2024-06-09 17:33:53.813+03', '2024-06-09 17:33:53.813+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (2, 'Красный соус', 'bbd45a6d-1d27-492e-9a8a-1f1d678c3c1d.webp', 1.2, '2024-06-09 17:34:25.399+03', '2024-06-09 17:34:25.399+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (3, 'Сырный соус', 'a39d900d-5819-465e-ae12-9b400dfb071b.webp', 1.2, '2024-06-09 17:34:39.667+03', '2024-06-09 17:34:39.667+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (4, 'Барбекю соус', '317b84a7-362e-432e-860b-43afcc009b71.webp', 1.2, '2024-06-09 17:34:58.98+03', '2024-06-09 17:34:58.98+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (5, 'Терияки соус', '67424ad3-867d-482c-a634-2288f5c8b988.webp', 1.2, '2024-06-09 17:35:20.418+03', '2024-06-09 17:35:20.418+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (6, 'Чесночный соус', 'f528a364-3a9c-471e-bb6d-3dbcdd8b4fe0.webp', 1.2, '2024-06-09 17:35:35.585+03', '2024-06-09 17:35:35.585+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (7, 'Цезарь соус', 'a5db4799-16b1-43dc-aa58-79bbce00ac9c.webp', 1.2, '2024-06-09 17:35:53.693+03', '2024-06-09 17:35:53.693+03');
INSERT INTO public.sauces (id, name, image, price, "createdAt", "updatedAt") VALUES (10, 'Хумус', '63bccf77-b8ff-48fa-bf75-a49fc48d754c.svg', 1.2, '2024-09-01 11:13:55.768+03', '2024-09-01 11:13:55.768+03');


--
-- TOC entry 5051 (class 0 OID 21439)
-- Dependencies: 231
-- Data for Name: shawarma_components; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (1, 'Лепешка', true, '2024-05-27 20:23:31.467+03', '2024-05-27 20:23:31.467+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (2, 'Курица', true, '2024-05-27 20:23:31.472+03', '2024-05-27 20:23:31.472+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (3, 'Капуста', false, '2024-05-27 20:23:31.477+03', '2024-05-27 20:23:31.477+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (4, 'Помидор', false, '2024-05-27 20:23:31.48+03', '2024-05-27 20:23:31.48+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (5, 'Маринованный огурец', false, '2024-05-27 20:23:31.482+03', '2024-05-27 20:23:31.482+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (6, 'Чесночный соус', false, '2024-05-27 20:23:31.486+03', '2024-05-27 20:23:31.486+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (7, 'Красный соус', false, '2024-05-27 20:23:31.49+03', '2024-05-27 20:23:31.49+03', 1);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (8, 'Лепешка', true, '2024-05-27 21:03:28.528+03', '2024-05-27 21:03:28.528+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (10, 'Капуста', false, '2024-05-27 21:03:28.534+03', '2024-05-27 21:03:28.534+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (11, 'Помидор', false, '2024-05-27 21:03:28.537+03', '2024-05-27 21:03:28.537+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (12, 'Маринованный огурец', false, '2024-05-27 21:03:28.54+03', '2024-05-27 21:03:28.54+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (13, 'Чесночный соус', false, '2024-05-27 21:03:28.544+03', '2024-05-27 21:03:28.544+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (14, 'Красный соус', false, '2024-05-27 21:03:28.549+03', '2024-05-27 21:03:28.549+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (15, 'Лепешка', true, '2024-05-27 21:25:26.266+03', '2024-05-27 21:25:26.266+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (16, 'Мраморная говядина', true, '2024-05-27 21:25:26.267+03', '2024-05-27 21:25:26.267+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (17, 'Пекинская капуста', false, '2024-05-27 21:25:26.268+03', '2024-05-27 21:25:26.268+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (18, 'Помидор', false, '2024-05-27 21:25:26.269+03', '2024-05-27 21:25:26.269+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (19, 'Маринованный огурец', false, '2024-05-27 21:25:26.27+03', '2024-05-27 21:25:26.27+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (20, 'Чесночный соус', false, '2024-05-27 21:25:26.271+03', '2024-05-27 21:25:26.271+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (21, 'Барбекю соус', false, '2024-05-27 21:25:26.273+03', '2024-05-27 21:25:26.273+03', 3);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (22, 'Сырная лепешка', true, '2024-05-27 21:43:43.957+03', '2024-05-27 21:43:43.957+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (23, 'Курица', true, '2024-05-27 21:43:43.961+03', '2024-05-27 21:43:43.961+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (24, 'Капуста', false, '2024-05-27 21:43:43.964+03', '2024-05-27 21:43:43.964+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (25, 'Сыр двойной', true, '2024-05-27 21:43:43.967+03', '2024-05-27 21:43:43.967+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (26, 'Сыр чеддер', true, '2024-05-27 21:43:43.971+03', '2024-05-27 21:43:43.971+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (27, 'Помидор', false, '2024-05-27 21:43:43.973+03', '2024-05-27 21:43:43.973+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (28, 'Маринованный огурец', false, '2024-05-27 21:43:43.976+03', '2024-05-27 21:43:43.976+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (29, 'Сырный соус', false, '2024-05-27 21:43:43.979+03', '2024-05-27 21:43:43.979+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (30, 'Чесночный соус', false, '2024-05-27 21:43:43.982+03', '2024-05-27 21:43:43.982+03', 4);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (31, 'Лепешка', true, '2024-05-27 21:53:00.04+03', '2024-05-27 21:53:00.04+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (32, 'Курица', true, '2024-05-27 21:53:00.044+03', '2024-05-27 21:53:00.044+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (33, 'Капуста', false, '2024-05-27 21:53:00.047+03', '2024-05-27 21:53:00.047+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (34, 'Помидор', false, '2024-05-27 21:53:00.051+03', '2024-05-27 21:53:00.051+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (35, 'Свежий огурец', false, '2024-05-27 21:53:00.054+03', '2024-05-27 21:53:00.054+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (36, 'Бекон', true, '2024-05-27 21:53:00.057+03', '2024-05-27 21:53:00.057+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (37, 'Кунжут', false, '2024-05-27 21:53:00.061+03', '2024-05-27 21:53:00.061+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (38, 'Терияки соус', false, '2024-05-27 21:53:00.065+03', '2024-05-27 21:53:00.065+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (39, 'Чесночный соус', false, '2024-05-27 21:53:00.07+03', '2024-05-27 21:53:00.07+03', 5);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (183, 'Лепешка', true, '2024-09-04 20:21:31.336+03', '2024-09-04 20:21:31.336+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (184, 'Курица', true, '2024-09-04 20:21:31.352+03', '2024-09-04 20:21:31.352+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (185, 'Капуста', false, '2024-09-04 20:21:31.355+03', '2024-09-04 20:21:31.355+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (186, 'Помидор', false, '2024-09-04 20:21:31.359+03', '2024-09-04 20:21:31.359+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (187, 'Маринованный огурец', false, '2024-09-04 20:21:31.362+03', '2024-09-04 20:21:31.362+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (188, 'Сыр', true, '2024-09-04 20:21:31.366+03', '2024-09-04 20:21:31.366+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (189, 'Горчица', false, '2024-09-04 20:21:31.369+03', '2024-09-04 20:21:31.369+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (56, 'Лепешка', true, '2024-05-27 22:05:04.514+03', '2024-05-27 22:05:04.514+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (57, 'Курица', true, '2024-05-27 22:05:04.515+03', '2024-05-27 22:05:04.515+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (58, 'Капуста', false, '2024-05-27 22:05:04.517+03', '2024-05-27 22:05:04.517+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (59, 'Помидор', false, '2024-05-27 22:05:04.518+03', '2024-05-27 22:05:04.518+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (60, 'Свежий огурец', false, '2024-05-27 22:05:04.519+03', '2024-05-27 22:05:04.519+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (61, 'Грудинка', true, '2024-05-27 22:05:04.521+03', '2024-05-27 22:05:04.521+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (62, 'Барбекю соус', false, '2024-05-27 22:05:04.522+03', '2024-05-27 22:05:04.522+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (63, 'Чесночный соус', false, '2024-05-27 22:05:04.523+03', '2024-05-27 22:05:04.523+03', 6);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (190, 'Чесночный соус', true, '2024-09-04 20:21:31.373+03', '2024-09-04 20:21:31.373+03', 20);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (72, 'Лепешка', true, '2024-06-19 18:36:47.968+03', '2024-06-19 18:36:47.968+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (73, 'Капуста', false, '2024-06-19 18:36:47.972+03', '2024-06-19 18:36:47.972+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (74, 'Помидор', false, '2024-06-19 18:36:47.975+03', '2024-06-19 18:36:47.975+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (75, 'Свежий огурец', false, '2024-06-19 18:36:47.978+03', '2024-06-19 18:36:47.978+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (76, 'Говядина', true, '2024-06-19 18:36:47.981+03', '2024-06-19 18:36:47.981+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (77, 'Секретный соус', false, '2024-06-19 18:36:47.983+03', '2024-06-19 18:36:47.983+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (78, 'Чесночный соус', false, '2024-06-19 18:36:47.985+03', '2024-06-19 18:36:47.985+03', 10);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (79, 'Лепешка', true, '2024-06-19 18:45:56.438+03', '2024-06-19 18:45:56.438+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (80, 'Капуста', false, '2024-06-19 18:45:56.442+03', '2024-06-19 18:45:56.442+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (81, 'Помидор', false, '2024-06-19 18:45:56.445+03', '2024-06-19 18:45:56.445+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (82, 'Маринованный огурец', false, '2024-06-19 18:45:56.45+03', '2024-06-19 18:45:56.45+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (83, 'Бекон', true, '2024-06-19 18:45:56.453+03', '2024-06-19 18:45:56.453+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (84, 'Грудинка', false, '2024-06-19 18:45:56.457+03', '2024-06-19 18:45:56.457+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (85, 'Красный соус', false, '2024-06-19 18:45:56.46+03', '2024-06-19 18:45:56.46+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (86, 'Чесночный соус', false, '2024-06-19 18:45:56.463+03', '2024-06-19 18:45:56.463+03', 11);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (87, 'Лепешка', true, '2024-06-19 18:54:29.139+03', '2024-06-19 18:54:29.139+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (88, 'Курица', true, '2024-06-19 18:54:29.142+03', '2024-06-19 18:54:29.142+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (89, 'Помидор', false, '2024-06-19 18:54:29.145+03', '2024-06-19 18:54:29.145+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (90, 'Свежий огурец', false, '2024-06-19 18:54:29.148+03', '2024-06-19 18:54:29.148+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (91, 'Пекинская капуста', false, '2024-06-19 18:54:29.152+03', '2024-06-19 18:54:29.152+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (9, 'Говядина', true, '2024-05-27 21:03:28.531+03', '2024-05-27 21:03:28.531+03', 2);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (221, 'Лепешка', true, '2024-09-04 22:19:41.784+03', '2024-09-04 22:19:41.784+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (222, 'Капуста', false, '2024-09-04 22:19:41.788+03', '2024-09-04 22:19:41.788+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (223, 'Помидор', false, '2024-09-04 22:19:41.791+03', '2024-09-04 22:19:41.791+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (224, 'Маринованный огурец', false, '2024-09-04 22:19:41.794+03', '2024-09-04 22:19:41.794+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (225, 'Грибы', true, '2024-09-04 22:19:41.797+03', '2024-09-04 22:19:41.797+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (226, 'Сметана', true, '2024-09-04 22:19:41.799+03', '2024-09-04 22:19:41.799+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (227, 'Чесночный соус', false, '2024-09-04 22:19:41.802+03', '2024-09-04 22:19:41.802+03', 24);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (255, 'Лепешка', true, '2024-09-04 22:28:40.602+03', '2024-09-04 22:28:40.602+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (256, 'Помидор', false, '2024-09-04 22:28:40.604+03', '2024-09-04 22:28:40.604+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (257, 'Свежий огурец', false, '2024-09-04 22:28:40.606+03', '2024-09-04 22:28:40.606+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (258, 'Пекинская капуста', false, '2024-09-04 22:28:40.609+03', '2024-09-04 22:28:40.609+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (259, 'Сыр', false, '2024-09-04 22:28:40.612+03', '2024-09-04 22:28:40.612+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (260, 'Грибы', false, '2024-09-04 22:28:40.615+03', '2024-09-04 22:28:40.615+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (261, 'Чесночный соус', false, '2024-09-04 22:28:40.618+03', '2024-09-04 22:28:40.618+03', 22);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (271, 'Лепешка', true, '2024-09-04 22:44:34.628+03', '2024-09-04 22:44:34.628+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (272, 'Помидор', false, '2024-09-04 22:44:34.632+03', '2024-09-04 22:44:34.632+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (273, 'Маринованный огурец', false, '2024-09-04 22:44:34.635+03', '2024-09-04 22:44:34.635+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (274, 'Пекинская капуста', false, '2024-09-04 22:44:34.638+03', '2024-09-04 22:44:34.638+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (275, 'Говядина', true, '2024-09-04 22:44:34.64+03', '2024-09-04 22:44:34.64+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (276, 'Сыр плавленый', false, '2024-09-04 22:44:34.642+03', '2024-09-04 22:44:34.642+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (277, 'Секретный соус', false, '2024-09-04 22:44:34.645+03', '2024-09-04 22:44:34.645+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (278, 'Чесночный соус', false, '2024-09-04 22:44:34.648+03', '2024-09-04 22:44:34.648+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (92, 'сливочный сыр', true, '2024-06-19 18:54:29.154+03', '2024-06-19 18:54:29.154+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (93, 'Красный соус', false, '2024-06-19 18:54:29.167+03', '2024-06-19 18:54:29.167+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (94, 'Чесночный соус', false, '2024-06-19 18:54:29.17+03', '2024-06-19 18:54:29.17+03', 12);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (95, 'Лепешка', true, '2024-06-19 18:58:14.432+03', '2024-06-19 18:58:14.432+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (96, 'Курица', false, '2024-06-19 18:58:14.434+03', '2024-06-19 18:58:14.434+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (97, 'Капуста', false, '2024-06-19 18:58:14.438+03', '2024-06-19 18:58:14.438+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (98, 'Свежий огурец', false, '2024-06-19 18:58:14.44+03', '2024-06-19 18:58:14.44+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (99, 'Помидор', false, '2024-06-19 18:58:14.443+03', '2024-06-19 18:58:14.443+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (100, 'Бекон', true, '2024-06-19 18:58:14.446+03', '2024-06-19 18:58:14.446+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (101, 'Красный соус', false, '2024-06-19 18:58:14.45+03', '2024-06-19 18:58:14.45+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (102, 'Чесночный соус', false, '2024-06-19 18:58:14.453+03', '2024-06-19 18:58:14.453+03', 13);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (103, 'Лепешка', true, '2024-06-19 19:02:55.239+03', '2024-06-19 19:02:55.239+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (104, 'Курица', true, '2024-06-19 19:02:55.242+03', '2024-06-19 19:02:55.242+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (105, 'Капуста', false, '2024-06-19 19:02:55.246+03', '2024-06-19 19:02:55.246+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (106, 'Свежий огурец', false, '2024-06-19 19:02:55.25+03', '2024-06-19 19:02:55.25+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (107, 'Помидор', false, '2024-06-19 19:02:55.254+03', '2024-06-19 19:02:55.254+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (108, 'Красный соус', false, '2024-06-19 19:02:55.257+03', '2024-06-19 19:02:55.257+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (109, 'Чесночный соус', false, '2024-06-19 19:02:55.26+03', '2024-06-19 19:02:55.26+03', 14);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (168, 'Лепешка', true, '2024-08-27 22:57:22.353+03', '2024-08-27 22:57:22.353+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (169, 'Курица', true, '2024-08-27 22:57:22.354+03', '2024-08-27 22:57:22.354+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (170, 'Капуста', false, '2024-08-27 22:57:22.355+03', '2024-08-27 22:57:22.355+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (171, 'Свежий огурец', false, '2024-08-27 22:57:22.356+03', '2024-08-27 22:57:22.356+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (172, 'Помидор', false, '2024-08-27 22:57:22.357+03', '2024-08-27 22:57:22.357+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (173, 'Терияки соус', true, '2024-08-27 22:57:22.358+03', '2024-08-27 22:57:22.358+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (174, 'Чесночный соус', false, '2024-08-27 22:57:22.359+03', '2024-08-27 22:57:22.359+03', 15);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (213, 'Лепешка', true, '2024-09-04 22:07:15.047+03', '2024-09-04 22:07:15.047+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (214, 'Помидор', false, '2024-09-04 22:07:15.053+03', '2024-09-04 22:07:15.053+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (215, 'Маринованный огурец', false, '2024-09-04 22:07:15.056+03', '2024-09-04 22:07:15.056+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (216, 'Свежий огурец', false, '2024-09-04 22:07:15.06+03', '2024-09-04 22:07:15.06+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (217, 'Пекинская капуста', false, '2024-09-04 22:07:15.063+03', '2024-09-04 22:07:15.063+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (218, 'Фалафель', true, '2024-09-04 22:07:15.066+03', '2024-09-04 22:07:15.066+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (219, 'Хумус', false, '2024-09-04 22:07:15.068+03', '2024-09-04 22:07:15.068+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (220, 'Чесночный соус', false, '2024-09-04 22:07:15.07+03', '2024-09-04 22:07:15.07+03', 23);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (235, 'Лепешка', true, '2024-09-04 22:26:04.165+03', '2024-09-04 22:26:04.165+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (236, 'Капуста', false, '2024-09-04 22:26:04.167+03', '2024-09-04 22:26:04.167+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (237, 'Помидор', false, '2024-09-04 22:26:04.169+03', '2024-09-04 22:26:04.169+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (238, 'Маринованный огурец', false, '2024-09-04 22:26:04.17+03', '2024-09-04 22:26:04.17+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (239, 'Грибы', true, '2024-09-04 22:26:04.171+03', '2024-09-04 22:26:04.171+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (240, 'Чесночный соус', false, '2024-09-04 22:26:04.172+03', '2024-09-04 22:26:04.172+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (241, 'Красный соус', false, '2024-09-04 22:26:04.175+03', '2024-09-04 22:26:04.175+03', 25);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (262, 'Лепешка', true, '2024-09-04 22:35:54.917+03', '2024-09-04 22:35:54.917+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (263, 'Курица', true, '2024-09-04 22:35:54.943+03', '2024-09-04 22:35:54.943+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (264, 'Помидор', false, '2024-09-04 22:35:54.945+03', '2024-09-04 22:35:54.945+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (265, 'Свежий огурец', false, '2024-09-04 22:35:54.948+03', '2024-09-04 22:35:54.948+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (266, 'Пекинская капуста', false, '2024-09-04 22:35:54.95+03', '2024-09-04 22:35:54.95+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (267, 'Сыр', false, '2024-09-04 22:35:54.953+03', '2024-09-04 22:35:54.953+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (268, 'Сухарики', false, '2024-09-04 22:35:54.955+03', '2024-09-04 22:35:54.955+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (269, 'Цезарь соус', true, '2024-09-04 22:35:54.956+03', '2024-09-04 22:35:54.956+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (270, 'Чесночный соус', false, '2024-09-04 22:35:54.959+03', '2024-09-04 22:35:54.959+03', 26);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (279, 'Красный соус', false, '2024-09-04 22:44:34.651+03', '2024-09-04 22:44:34.651+03', 27);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (280, 'Лепешка', true, '2024-09-04 22:54:38.151+03', '2024-09-04 22:54:38.151+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (281, 'Курица', true, '2024-09-04 22:54:38.154+03', '2024-09-04 22:54:38.154+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (282, 'Капуста', false, '2024-09-04 22:54:38.157+03', '2024-09-04 22:54:38.157+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (283, 'Помидор', false, '2024-09-04 22:54:38.159+03', '2024-09-04 22:54:38.159+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (284, 'Маринованный огурец', false, '2024-09-04 22:54:38.162+03', '2024-09-04 22:54:38.162+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (285, 'Грибы', false, '2024-09-04 22:54:38.165+03', '2024-09-04 22:54:38.165+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (286, 'Картофель по-деревенски', false, '2024-09-04 22:54:38.167+03', '2024-09-04 22:54:38.167+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (287, 'Лук свежий', false, '2024-09-04 22:54:38.17+03', '2024-09-04 22:54:38.17+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (288, 'Сметанный соус', false, '2024-09-04 22:54:38.173+03', '2024-09-04 22:54:38.173+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (289, 'Чесночный соус', false, '2024-09-04 22:54:38.176+03', '2024-09-04 22:54:38.176+03', 28);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (290, 'Лепешка', true, '2024-09-04 23:00:07.809+03', '2024-09-04 23:00:07.809+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (291, 'Курица', true, '2024-09-04 23:00:07.812+03', '2024-09-04 23:00:07.812+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (292, 'Капуста', false, '2024-09-04 23:00:07.814+03', '2024-09-04 23:00:07.814+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (293, 'Помидор', false, '2024-09-04 23:00:07.816+03', '2024-09-04 23:00:07.816+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (294, 'Маринованный огурец', false, '2024-09-04 23:00:07.819+03', '2024-09-04 23:00:07.819+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (295, 'Чили соус', true, '2024-09-04 23:00:07.821+03', '2024-09-04 23:00:07.821+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (296, 'Чесночный соус', false, '2024-09-04 23:00:07.823+03', '2024-09-04 23:00:07.823+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (297, 'Красный соус', false, '2024-09-04 23:00:07.826+03', '2024-09-04 23:00:07.826+03', 29);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (298, 'Лепешка', true, '2024-09-04 23:05:41.966+03', '2024-09-04 23:05:41.966+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (299, 'Курица', true, '2024-09-04 23:05:41.969+03', '2024-09-04 23:05:41.969+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (300, 'Капуста', false, '2024-09-04 23:05:41.971+03', '2024-09-04 23:05:41.971+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (301, 'Помидор', false, '2024-09-04 23:05:41.974+03', '2024-09-04 23:05:41.974+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (302, 'Маринованный огурец', false, '2024-09-04 23:05:41.976+03', '2024-09-04 23:05:41.976+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (303, 'Картофель фри', false, '2024-09-04 23:05:41.979+03', '2024-09-04 23:05:41.979+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (304, 'Чесночный соус', false, '2024-09-04 23:05:41.982+03', '2024-09-04 23:05:41.982+03', 30);
INSERT INTO public.shawarma_components (id, name, necessity, "createdAt", "updatedAt", "shawarmaId") VALUES (305, 'Красный соус', false, '2024-09-04 23:05:41.984+03', '2024-09-04 23:05:41.984+03', 30);


--
-- TOC entry 5057 (class 0 OID 21801)
-- Dependencies: 237
-- Data for Name: shawarma_from_baskets; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (34, '2024-07-21 13:28:13.039+03', '2024-07-23 18:31:20.306+03', 24, '1Обычная лепешка300[][]', 1, 'чикен', '9c966eae-3c59-4c22-8460-6a9869c5e8c1.webp', 300, '5,90', 'Обычная лепешка', 2, '[]', '[]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (411, '2024-08-31 17:24:45.939+03', '2024-08-31 17:24:45.939+03', 15, '409Обычная лепешка400[][]', 409, 'стартер', 'b76d1d49-ebb9-4c4e-8b0a-c1f0ee7b9626.webp', 400, '8,90', 'Обычная лепешка', 1, '[]', '[]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (412, '2024-08-31 17:24:45.941+03', '2024-08-31 17:24:45.941+03', 15, '410Обычная лепешка400[{"id":2,"name":"Картофель фри","count":1,"price":1.2}][]', 410, 'чикен', '9c966eae-3c59-4c22-8460-6a9869c5e8c1.webp', 400, '9,10', 'Обычная лепешка', 1, '[{"id":2,"name":"Картофель фри","count":1,"price":1.2}]', '[]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (35, '2024-07-21 13:28:16.422+03', '2024-07-21 13:28:16.422+03', 24, '9Обычная лепешка400[][]', 9, 'фишер', '6da8d571-209f-45f0-9688-b1a5171eddc8.webp', 400, '9,90', 'Обычная лепешка', 1, '[]', '[]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (36, '2024-07-21 13:29:28.68+03', '2024-07-21 13:29:28.68+03', 24, '10Сырная лепешка400[{"id":2,"name":"Картофель фри","count":1,"price":1.2}]["Чесночный соус"]', 10, 'биф', 'e73ff357-f154-4629-9cb0-2d29637e48c2.webp', 400, '12,10', 'Сырная лепешка', 1, '[{"id":2,"name":"Картофель фри","count":1,"price":1.2}]', '["Чесночный соус"]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (37, '2024-07-21 13:31:00.341+03', '2024-07-21 13:31:00.341+03', 24, '3Обычная лепешка400[][]', 3, 'рафл барбекю', 'ad415dc4-f143-412f-af99-c295de69fe83.webp', 400, '9,90', 'Обычная лепешка', 1, '[]', '[]');
INSERT INTO public.shawarma_from_baskets (id, "createdAt", "updatedAt", "basketId", "uniqueShawaKey", "shawarmaId", title, image, weight, price, cake, count, "addedComponentsList", "removedComponentsList") VALUES (418, '2024-09-05 18:29:06.955+03', '2024-09-05 18:29:06.955+03', 4, '13Обычная лепешка400[][]', 13, 'бекон', 'dc39cfef-156a-42b8-8d19-30b2b95c30b3.webp', 400, '8,90', 'Обычная лепешка', 1, '[]', '[]');


--
-- TOC entry 5049 (class 0 OID 21427)
-- Dependencies: 229
-- Data for Name: shawarma_props; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (5, 400, 9.9, '2024-05-27 21:03:28.523+03', '2024-05-27 21:03:28.523+03', 2);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (6, 400, 9.9, '2024-05-27 21:25:26.264+03', '2024-05-27 21:25:26.264+03', 3);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (8, 400, 8.9, '2024-05-27 21:53:00.034+03', '2024-05-27 21:53:00.034+03', 5);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (9, 550, 10.9, '2024-05-27 21:53:00.037+03', '2024-05-27 21:53:00.037+03', 5);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (14, 400, 8.9, '2024-05-27 22:05:04.511+03', '2024-05-27 22:05:04.511+03', 6);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (15, 550, 10.9, '2024-05-27 22:05:04.512+03', '2024-05-27 22:05:04.512+03', 6);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (17, 400, 10.9, '2024-06-19 18:36:47.963+03', '2024-06-19 18:36:47.963+03', 10);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (22, 400, 8.9, '2024-06-19 18:58:14.427+03', '2024-06-19 18:58:14.427+03', 13);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (23, 550, 10.9, '2024-06-19 18:58:14.429+03', '2024-06-19 18:58:14.429+03', 13);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (24, 400, 7.9, '2024-06-19 19:02:55.233+03', '2024-06-19 19:02:55.233+03', 14);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (25, 550, 9.9, '2024-06-19 19:02:55.236+03', '2024-06-19 19:02:55.236+03', 14);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (151, 650, 10.9, '2024-08-27 22:57:22.348+03', '2024-08-27 22:57:22.348+03', 15);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (152, 400, 8.9, '2024-08-27 22:57:22.35+03', '2024-08-27 22:57:22.35+03', 15);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (153, 550, 9.9, '2024-08-27 22:57:22.352+03', '2024-08-27 22:57:22.352+03', 15);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (38, 300, 5.9, '2024-08-26 18:07:54.259+03', '2024-08-26 18:07:54.259+03', 1);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (39, 400, 7.9, '2024-08-26 18:07:54.263+03', '2024-08-26 18:07:54.263+03', 1);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (40, 550, 9.9, '2024-08-26 18:07:54.268+03', '2024-08-26 18:07:54.268+03', 1);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (41, 650, 10.9, '2024-08-26 18:07:54.271+03', '2024-08-26 18:07:54.271+03', 1);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (42, 550, 10.9, '2024-08-26 18:43:29.631+03', '2024-08-26 18:43:29.631+03', 11);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (43, 400, 8.9, '2024-08-26 18:43:29.642+03', '2024-08-26 18:43:29.642+03', 11);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (162, 400, 9.5, '2024-09-04 20:21:31.315+03', '2024-09-04 20:21:31.315+03', 20);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (163, 550, 11.5, '2024-09-04 20:21:31.331+03', '2024-09-04 20:21:31.331+03', 20);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (168, 400, 8.9, '2024-09-04 22:07:15.003+03', '2024-09-04 22:07:15.003+03', 23);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (169, 500, 9.9, '2024-09-04 22:07:15.044+03', '2024-09-04 22:07:15.044+03', 23);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (170, 400, 9.5, '2024-09-04 22:19:41.779+03', '2024-09-04 22:19:41.779+03', 24);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (171, 550, 11.5, '2024-09-04 22:19:41.781+03', '2024-09-04 22:19:41.781+03', 24);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (174, 550, 11.5, '2024-09-04 22:26:04.159+03', '2024-09-04 22:26:04.159+03', 25);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (175, 400, 9.5, '2024-09-04 22:26:04.162+03', '2024-09-04 22:26:04.162+03', 25);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (177, 450, 7.9, '2024-09-04 22:28:40.597+03', '2024-09-04 22:28:40.597+03', 22);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (178, 500, 11.5, '2024-09-04 22:35:54.911+03', '2024-09-04 22:35:54.911+03', 26);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (179, 450, 11.5, '2024-09-04 22:44:34.625+03', '2024-09-04 22:44:34.625+03', 27);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (180, 500, 11.5, '2024-09-04 22:54:38.148+03', '2024-09-04 22:54:38.148+03', 28);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (181, 400, 9.5, '2024-09-04 23:00:07.805+03', '2024-09-04 23:00:07.805+03', 29);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (182, 550, 11.5, '2024-09-04 23:00:07.807+03', '2024-09-04 23:00:07.807+03', 29);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (183, 400, 9.5, '2024-09-04 23:05:41.96+03', '2024-09-04 23:05:41.96+03', 30);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (125, 450, 8.9, '2024-08-27 20:51:47.753+03', '2024-08-27 20:51:47.753+03', 12);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (126, 550, 10.9, '2024-08-27 20:51:47.756+03', '2024-08-27 20:51:47.756+03', 12);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (184, 550, 11.5, '2024-09-04 23:05:41.963+03', '2024-09-04 23:05:41.963+03', 30);
INSERT INTO public.shawarma_props (id, weight, price, "createdAt", "updatedAt", "shawarmaId") VALUES (129, 450, 10.9, '2024-08-27 21:58:13.18+03', '2024-08-27 21:58:13.18+03', 4);


--
-- TOC entry 5042 (class 0 OID 21373)
-- Dependencies: 222
-- Data for Name: shawarmas; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (15, 'Терияки', 'Терияки', '8e10ba5d-aef4-47c3-9650-ea5d4f921bad.webp', 'c1e79d67-f25c-447b-bcd9-7f332d022dd0.svg', false, true, '2024-06-19 19:06:23.505+03', '2024-08-27 20:32:51.166+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (12, 'Сырный крем', 'крем чиз', '275f0050-6877-4737-b165-d2df8d367a68.webp', 'a1ac1ee6-0837-4858-a0e2-3617f42b2338.svg', false, true, '2024-06-19 18:54:29.083+03', '2024-08-27 20:51:47.747+03', 4);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (4, 'Сырная', 'чизер', '799869f7-5030-47f9-81b0-fe97f6ea0358.png', '56864a93-2cba-4ab3-87f4-a37bbc335a7e.svg', false, true, '2024-05-27 21:43:43.9+03', '2024-08-27 21:58:13.175+03', 4);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (20, 'Бомбер сырный с курицей', 'Бомбер', 'aef90c70-43b0-4a4a-a624-889fc6a18c0c.webp', '66943957-7c6d-4ce9-b82c-bb61ff53d3ad.svg', false, true, '2024-09-04 20:21:31.241+03', '2024-09-04 20:21:31.241+03', 4);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (10, 'Биф', 'биф', 'e73ff357-f154-4629-9cb0-2d29637e48c2.webp', 'b870b6d8-598e-497e-8626-e60981bd6018.svg', true, true, '2024-06-19 18:36:47.899+03', '2024-06-19 18:36:47.899+03', 3);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (22, 'Вегетарианская с овощами', 'Вегетариан', 'd51dfd1a-2b1f-42bb-a2fe-f396c3f6cd56.webp', '40d40729-3eee-4d13-9018-54a41edce9d4.svg', false, true, '2024-09-04 20:37:42.172+03', '2024-09-04 20:37:42.172+03', 15);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (23, 'Фалафель', 'Фалафель', '7c1468e4-2fc0-43b5-a9f5-08080eacadb3.webp', '6aae1827-7a0f-4e66-887f-673ee65a1ac3.svg', false, true, '2024-09-04 22:07:14.944+03', '2024-09-04 22:07:14.944+03', 15);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (24, 'Грибы со сметаной', 'Сметанный гриб', 'abc6f811-2f51-420b-a200-d9c10689837e.webp', 'fd3d2f9b-fcfa-4109-9656-643198765bc6.svg', false, true, '2024-09-04 22:19:41.72+03', '2024-09-04 22:19:41.72+03', 15);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (25, 'Грибной', 'Лесные грибочки', 'a11068ff-1e99-4ffa-8fc9-f27a49ef3c6b.webp', '9c05d8a0-8bd7-4bb0-b164-35801a7e387c.svg', false, true, '2024-09-04 22:23:58.885+03', '2024-09-04 22:23:58.885+03', 15);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (26, 'Салат с курицей', 'Цезарь', '0bb9779c-5236-4df5-abc8-972aa372313f.webp', '1625a3b2-1837-49c7-8ea7-119a058f22e5.svg', false, true, '2024-09-04 22:35:54.842+03', '2024-09-04 22:35:54.842+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (11, 'Стартер Бекон', 'стартер', 'b76d1d49-ebb9-4c4e-8b0a-c1f0ee7b9626.webp', '89b18ad6-e815-4285-ba89-df7f2ecdb47f.svg', false, true, '2024-06-19 18:45:56.379+03', '2024-06-19 18:45:56.379+03', 5);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (27, 'Говяжий стейк', 'Стейк', 'c11bc8e5-a37d-4b26-a775-a736f66ade23.webp', '389f4798-ceba-4a4e-9939-a66e8d4a8b5d.svg', false, true, '2024-09-04 22:44:34.57+03', '2024-09-04 22:44:34.57+03', 3);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (28, 'Деревенский набор', 'Деревня', '274d98e4-975e-47a1-a9e0-edba9c42f8e7.webp', '7d6f5e75-3832-4376-957a-0e043d6e9424.svg', true, true, '2024-09-04 22:54:38.09+03', '2024-09-04 22:54:38.09+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (29, 'Острая!', 'Чили Хот', 'b20777ed-c7d0-4365-8e75-3e933222bf3b.webp', '1e9d73b8-517b-4344-ba37-6126ab3c5c3e.svg', false, true, '2024-09-04 23:00:07.753+03', '2024-09-04 23:00:07.753+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (30, 'Курица с картошкой-фри', 'Фри', '912f1a47-42d8-4434-82be-2c28d3a6b0a4.webp', '45c8749a-1044-4f43-8de4-45cbcecccd52.svg', false, true, '2024-09-04 23:05:41.902+03', '2024-09-04 23:05:41.902+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (1, 'Курица Стандарт', 'чикен', '9c966eae-3c59-4c22-8460-6a9869c5e8c1.webp', '134460f0-671b-4db0-886a-fe4d61de382a.svg', true, true, '2024-05-27 20:23:31.396+03', '2024-05-28 00:05:00.787+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (2, 'Рафл Тейсти', 'рафл тейсти', '3747102a-77fe-4e3f-95f5-5699b96663c3.webp', '25d4ee28-68fa-4bea-aec7-4f8720f1e732.svg', false, true, '2024-05-27 21:03:28.467+03', '2024-05-27 21:03:28.467+03', 3);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (3, 'Рафл Барбекю', 'рафл барбекю', 'ad415dc4-f143-412f-af99-c295de69fe83.webp', 'cf9a69d9-53cd-47b9-82f5-f62ef6e9b5aa.svg', true, true, '2024-05-27 21:25:26.237+03', '2024-05-28 00:05:44.737+03', 3);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (5, 'Бёрпи', 'бёрпи', 'f1297eb1-8267-4f58-a033-73ccdd22e8f1.webp', 'a3bfef36-bbe4-479a-a36f-0e6f45f19570.svg', false, true, '2024-05-27 21:52:59.978+03', '2024-05-27 21:52:59.978+03', 5);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (6, 'Слайсер Бекон', 'слайсер', '1e343bbb-15cb-42f6-99c0-b501085bedf7.webp', '02268bcd-2a88-4c16-9560-d19071728ce8.svg', false, true, '2024-05-27 22:05:04.463+03', '2024-05-27 22:05:04.463+03', 5);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (14, 'Курица Фреш', 'чикен фреш', 'b0e46297-2960-47bb-a7a0-f11d2d3281db.webp', '9019c1c1-53ce-4d71-8ea4-a434cc41c19e.svg', false, true, '2024-06-19 19:02:55.175+03', '2024-06-25 19:48:02.589+03', 2);
INSERT INTO public.shawarmas (id, name, title, image, icon, novelty, presence, "createdAt", "updatedAt", "categoryId") VALUES (13, 'Бекон Стандарт', 'бекон', 'dc39cfef-156a-42b8-8d19-30b2b95c30b3.webp', 'a1a6036e-64d3-4b5a-bfb8-2f0eaff07c34.svg', false, true, '2024-06-19 18:58:14.363+03', '2024-08-22 23:38:59.735+03', 5);


--
-- TOC entry 5036 (class 0 OID 21345)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: portfolio
--

INSERT INTO public.users (id, email, password, role, "createdAt", "updatedAt") VALUES (10, 'vadim@mail.ru', '$2b$05$ehjj5eXn.gLxp.5zFZIuZO37KN5/BF.Az.NrQfpPVbTcHR7OUuVx.', 'ADMIN', '2024-07-19 12:26:09.025+03', '2024-07-19 12:26:09.025+03');
INSERT INTO public.users (id, email, password, role, "createdAt", "updatedAt") VALUES (79, 'alex@mail.ru', '$2b$05$AB63C5aOKTtSlzVmn2Obj.uzpuThFCwVy.caxgCkF9LprS98H3psu', 'USER', '2024-08-14 23:39:20.498+03', '2024-08-14 23:39:20.498+03');
INSERT INTO public.users (id, email, password, role, "createdAt", "updatedAt") VALUES (22, 'pete@mail.ru', '$2b$05$095WoNtXJMEH.FoHl17sjeDFSSD0bLDsVajjhrc7osPM3200227Ey', 'USER', '2024-07-19 18:53:46.266+03', '2024-09-04 00:21:53.581+03');
INSERT INTO public.users (id, email, password, role, "createdAt", "updatedAt") VALUES (32, 'tati@mail.com', '$2b$05$MKeQw6zDY8NWtMVHw5Em4eiNRy25DARqbD9dmzDHJZ/oGajXqmSLS', 'USER', '2024-07-21 13:28:00.094+03', '2024-07-21 13:28:00.094+03');


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 217
-- Name: baskets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.baskets_id_seq', 72, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.categories_id_seq', 16, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 223
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 7, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 234
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.order_items_id_seq', 56, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 232
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.orders_id_seq', 30, true);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 225
-- Name: sauces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.sauces_id_seq', 10, true);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 230
-- Name: shawarma_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.shawarma_components_id_seq', 305, true);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 236
-- Name: shawarma_from_baskets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.shawarma_from_baskets_id_seq', 418, true);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 228
-- Name: shawarma_props_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.shawarma_props_id_seq', 184, true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 221
-- Name: shawarmas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.shawarmas_id_seq', 30, true);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: portfolio
--

SELECT pg_catalog.setval('public.users_id_seq', 80, true);


--
-- TOC entry 4872 (class 2606 OID 21415)
-- Name: basket_shawarmas basket_shawarmas_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.basket_shawarmas
    ADD CONSTRAINT basket_shawarmas_pkey PRIMARY KEY ("basketId", "shawarmaId");


--
-- TOC entry 4790 (class 2606 OID 21362)
-- Name: baskets baskets_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT baskets_pkey PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 22959)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- TOC entry 4794 (class 2606 OID 22957)
-- Name: categories categories_name_key1; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key1 UNIQUE (name);


--
-- TOC entry 4796 (class 2606 OID 22949)
-- Name: categories categories_name_key10; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key10 UNIQUE (name);


--
-- TOC entry 4798 (class 2606 OID 22971)
-- Name: categories categories_name_key11; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key11 UNIQUE (name);


--
-- TOC entry 4800 (class 2606 OID 22961)
-- Name: categories categories_name_key2; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key2 UNIQUE (name);


--
-- TOC entry 4802 (class 2606 OID 22955)
-- Name: categories categories_name_key3; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key3 UNIQUE (name);


--
-- TOC entry 4804 (class 2606 OID 22963)
-- Name: categories categories_name_key4; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key4 UNIQUE (name);


--
-- TOC entry 4806 (class 2606 OID 22965)
-- Name: categories categories_name_key5; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key5 UNIQUE (name);


--
-- TOC entry 4808 (class 2606 OID 22953)
-- Name: categories categories_name_key6; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key6 UNIQUE (name);


--
-- TOC entry 4810 (class 2606 OID 22967)
-- Name: categories categories_name_key7; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key7 UNIQUE (name);


--
-- TOC entry 4812 (class 2606 OID 22951)
-- Name: categories categories_name_key8; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key8 UNIQUE (name);


--
-- TOC entry 4814 (class 2606 OID 22969)
-- Name: categories categories_name_key9; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key9 UNIQUE (name);


--
-- TOC entry 4816 (class 2606 OID 21369)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 21400)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 21479)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4878 (class 2606 OID 21462)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 21409)
-- Name: sauces sauces_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.sauces
    ADD CONSTRAINT sauces_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 21445)
-- Name: shawarma_components shawarma_components_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_components
    ADD CONSTRAINT shawarma_components_pkey PRIMARY KEY (id);


--
-- TOC entry 4882 (class 2606 OID 21807)
-- Name: shawarma_from_baskets shawarma_from_baskets_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_from_baskets
    ADD CONSTRAINT shawarma_from_baskets_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 21432)
-- Name: shawarma_props shawarma_props_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_props
    ADD CONSTRAINT shawarma_props_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 22985)
-- Name: shawarmas shawarmas_name_key; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key UNIQUE (name);


--
-- TOC entry 4820 (class 2606 OID 22983)
-- Name: shawarmas shawarmas_name_key1; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key1 UNIQUE (name);


--
-- TOC entry 4822 (class 2606 OID 22975)
-- Name: shawarmas shawarmas_name_key10; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key10 UNIQUE (name);


--
-- TOC entry 4824 (class 2606 OID 22997)
-- Name: shawarmas shawarmas_name_key11; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key11 UNIQUE (name);


--
-- TOC entry 4826 (class 2606 OID 22987)
-- Name: shawarmas shawarmas_name_key2; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key2 UNIQUE (name);


--
-- TOC entry 4828 (class 2606 OID 22989)
-- Name: shawarmas shawarmas_name_key3; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key3 UNIQUE (name);


--
-- TOC entry 4830 (class 2606 OID 22981)
-- Name: shawarmas shawarmas_name_key4; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key4 UNIQUE (name);


--
-- TOC entry 4832 (class 2606 OID 22991)
-- Name: shawarmas shawarmas_name_key5; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key5 UNIQUE (name);


--
-- TOC entry 4834 (class 2606 OID 22979)
-- Name: shawarmas shawarmas_name_key6; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key6 UNIQUE (name);


--
-- TOC entry 4836 (class 2606 OID 22993)
-- Name: shawarmas shawarmas_name_key7; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key7 UNIQUE (name);


--
-- TOC entry 4838 (class 2606 OID 22977)
-- Name: shawarmas shawarmas_name_key8; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key8 UNIQUE (name);


--
-- TOC entry 4840 (class 2606 OID 22995)
-- Name: shawarmas shawarmas_name_key9; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_name_key9 UNIQUE (name);


--
-- TOC entry 4842 (class 2606 OID 21382)
-- Name: shawarmas shawarmas_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 23009)
-- Name: shawarmas shawarmas_title_key; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key UNIQUE (title);


--
-- TOC entry 4846 (class 2606 OID 23007)
-- Name: shawarmas shawarmas_title_key1; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key1 UNIQUE (title);


--
-- TOC entry 4848 (class 2606 OID 23001)
-- Name: shawarmas shawarmas_title_key10; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key10 UNIQUE (title);


--
-- TOC entry 4850 (class 2606 OID 23023)
-- Name: shawarmas shawarmas_title_key11; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key11 UNIQUE (title);


--
-- TOC entry 4852 (class 2606 OID 23011)
-- Name: shawarmas shawarmas_title_key2; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key2 UNIQUE (title);


--
-- TOC entry 4854 (class 2606 OID 23013)
-- Name: shawarmas shawarmas_title_key3; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key3 UNIQUE (title);


--
-- TOC entry 4856 (class 2606 OID 23005)
-- Name: shawarmas shawarmas_title_key4; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key4 UNIQUE (title);


--
-- TOC entry 4858 (class 2606 OID 23015)
-- Name: shawarmas shawarmas_title_key5; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key5 UNIQUE (title);


--
-- TOC entry 4860 (class 2606 OID 23003)
-- Name: shawarmas shawarmas_title_key6; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key6 UNIQUE (title);


--
-- TOC entry 4862 (class 2606 OID 23017)
-- Name: shawarmas shawarmas_title_key7; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key7 UNIQUE (title);


--
-- TOC entry 4864 (class 2606 OID 23019)
-- Name: shawarmas shawarmas_title_key8; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key8 UNIQUE (title);


--
-- TOC entry 4866 (class 2606 OID 23021)
-- Name: shawarmas shawarmas_title_key9; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT shawarmas_title_key9 UNIQUE (title);


--
-- TOC entry 4764 (class 2606 OID 22922)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4766 (class 2606 OID 22920)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 4768 (class 2606 OID 22916)
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- TOC entry 4770 (class 2606 OID 22938)
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- TOC entry 4772 (class 2606 OID 22924)
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- TOC entry 4774 (class 2606 OID 22926)
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- TOC entry 4776 (class 2606 OID 22928)
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- TOC entry 4778 (class 2606 OID 22930)
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- TOC entry 4780 (class 2606 OID 22918)
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- TOC entry 4782 (class 2606 OID 22932)
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- TOC entry 4784 (class 2606 OID 22934)
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- TOC entry 4786 (class 2606 OID 22936)
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- TOC entry 4788 (class 2606 OID 21353)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4885 (class 2606 OID 21416)
-- Name: basket_shawarmas basket_shawarmas_basketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.basket_shawarmas
    ADD CONSTRAINT "basket_shawarmas_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES public.baskets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4886 (class 2606 OID 21421)
-- Name: basket_shawarmas basket_shawarmas_shawarmaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.basket_shawarmas
    ADD CONSTRAINT "basket_shawarmas_shawarmaId_fkey" FOREIGN KEY ("shawarmaId") REFERENCES public.shawarmas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 22941)
-- Name: baskets baskets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4890 (class 2606 OID 23065)
-- Name: order_items order_items_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4889 (class 2606 OID 23056)
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4888 (class 2606 OID 23047)
-- Name: shawarma_components shawarma_components_shawarmaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_components
    ADD CONSTRAINT "shawarma_components_shawarmaId_fkey" FOREIGN KEY ("shawarmaId") REFERENCES public.shawarmas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4891 (class 2606 OID 23033)
-- Name: shawarma_from_baskets shawarma_from_baskets_basketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_from_baskets
    ADD CONSTRAINT "shawarma_from_baskets_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES public.baskets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4887 (class 2606 OID 23040)
-- Name: shawarma_props shawarma_props_shawarmaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarma_props
    ADD CONSTRAINT "shawarma_props_shawarmaId_fkey" FOREIGN KEY ("shawarmaId") REFERENCES public.shawarmas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4884 (class 2606 OID 23028)
-- Name: shawarmas shawarmas_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portfolio
--

ALTER TABLE ONLY public.shawarmas
    ADD CONSTRAINT "shawarmas_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-09-05 23:50:27

--
-- PostgreSQL database dump complete
--

