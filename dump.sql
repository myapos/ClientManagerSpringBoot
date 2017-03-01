--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: clientmanagerspringboot; Type: SCHEMA; Schema: -; Owner: myapos
--

CREATE SCHEMA clientmanagerspringboot;


ALTER SCHEMA clientmanagerspringboot OWNER TO myapos;

SET search_path = clientmanagerspringboot, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: databasechangelog; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE clientmanagerspringboot.databasechangelog OWNER TO myapos;

--
-- Name: databasechangeloglock; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE clientmanagerspringboot.databasechangeloglock OWNER TO myapos;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.hibernate_sequence OWNER TO myapos;

--
-- Name: manager; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE manager (
    id bigint NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    roles bytea
);


ALTER TABLE clientmanagerspringboot.manager OWNER TO myapos;

--
-- Name: manager_id_seq; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.manager_id_seq OWNER TO myapos;

--
-- Name: manager_id_seq; Type: SEQUENCE OWNED BY; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER SEQUENCE manager_id_seq OWNED BY manager.id;


--
-- Name: payed; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE payed (
    id bigint NOT NULL,
    payment boolean NOT NULL,
    date_of_payment timestamp without time zone NOT NULL,
    notes text,
    register_id bigint NOT NULL
);


ALTER TABLE clientmanagerspringboot.payed OWNER TO myapos;

--
-- Name: payed_id_seq; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE payed_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.payed_id_seq OWNER TO myapos;

--
-- Name: payed_id_seq; Type: SEQUENCE OWNED BY; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER SEQUENCE payed_id_seq OWNED BY payed.id;


--
-- Name: register; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE register (
    id bigint NOT NULL,
    date_of_registration timestamp without time zone NOT NULL,
    student_id bigint NOT NULL,
    student_class_id bigint NOT NULL
);


ALTER TABLE clientmanagerspringboot.register OWNER TO myapos;

--
-- Name: register_id_seq; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE register_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.register_id_seq OWNER TO myapos;

--
-- Name: register_id_seq; Type: SEQUENCE OWNED BY; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER SEQUENCE register_id_seq OWNED BY register.id;


--
-- Name: student; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE student (
    id bigint NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    date_of_birth timestamp without time zone NOT NULL,
    email text,
    phone text,
    facebook text,
    manager_id bigint NOT NULL
);


ALTER TABLE clientmanagerspringboot.student OWNER TO myapos;

--
-- Name: student_class; Type: TABLE; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

CREATE TABLE student_class (
    id bigint NOT NULL,
    description text NOT NULL,
    student_class_id bigint NOT NULL
);


ALTER TABLE clientmanagerspringboot.student_class OWNER TO myapos;

--
-- Name: student_class_id_seq; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE student_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.student_class_id_seq OWNER TO myapos;

--
-- Name: student_class_id_seq; Type: SEQUENCE OWNED BY; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER SEQUENCE student_class_id_seq OWNED BY student_class.id;


--
-- Name: student_id_seq; Type: SEQUENCE; Schema: clientmanagerspringboot; Owner: myapos
--

CREATE SEQUENCE student_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientmanagerspringboot.student_id_seq OWNER TO myapos;

--
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER SEQUENCE student_id_seq OWNED BY student.id;


--
-- Name: id; Type: DEFAULT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY manager ALTER COLUMN id SET DEFAULT nextval('manager_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY payed ALTER COLUMN id SET DEFAULT nextval('payed_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY register ALTER COLUMN id SET DEFAULT nextval('register_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY student ALTER COLUMN id SET DEFAULT nextval('student_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY student_class ALTER COLUMN id SET DEFAULT nextval('student_class_id_seq'::regclass);


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1	myapos	../database_liqui.json	2017-01-04 12:59:34.167851	1	EXECUTED	7:6a229c9f90aaaba830eb6b5265928106	createTable tableName=manager		\N	3.5.3	\N	\N	3527573974
2	myapos	../database_liqui.json	2017-01-04 12:59:34.434325	2	EXECUTED	7:d8ab94d8eb2e92856f75752a241ea77a	createTable tableName=student		\N	3.5.3	\N	\N	3527573974
3	myapos	../database_liqui.json	2017-01-04 12:59:34.612153	3	EXECUTED	7:1489468b84141181cf968027f368ae6f	createTable tableName=student_class		\N	3.5.3	\N	\N	3527573974
4	myapos	../database_liqui.json	2017-01-04 12:59:34.723208	4	EXECUTED	7:a0932cce82299afd441c5d81420ba52a	createTable tableName=payed		\N	3.5.3	\N	\N	3527573974
5	myapos	../database_liqui.json	2017-01-04 12:59:34.789269	5	EXECUTED	7:4a6f0c26f11d3a2aadca1dded71299b9	createTable tableName=register		\N	3.5.3	\N	\N	3527573974
6	myapos	../database_liqui.json	2017-01-04 12:59:34.848045	6	EXECUTED	7:4c40011e3a1498f396a66b4fe79e87b3	addColumn tableName=payed		\N	3.5.3	\N	\N	3527573974
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('hibernate_sequence', 155, true);


--
-- Data for Name: manager; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY manager (id, name, password, roles) FROM stdin;
16	greg	$2a$10$IpcIynx8Zzds56lqxWzS3ewO7GxTHfZN/bogqW0Hd46WoXHEUCnOS	\\xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b4702000078700000000174000c524f4c455f4d414e41474552
17	myapos	$2a$10$tAehrcSDiexCTDiLDLwkqOvmNQfG5MWpQY5DmwhNvufhDYiYlO23a	\\xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b4702000078700000000174000c524f4c455f4d414e41474552
\.


--
-- Name: manager_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('manager_id_seq', 1, false);


--
-- Data for Name: payed; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY payed (id, payment, date_of_payment, notes, register_id) FROM stdin;
17	t	2001-01-01 00:00:00	payed test 123	141
150	f	2001-01-01 00:00:00	payed 123ghjfjghj	147
155	t	2001-02-01 00:00:00	No payment yet hghg	154
153	t	2001-01-01 00:00:00	payed 111	152
19	t	2001-01-01 00:00:00	payed y	148
\.


--
-- Name: payed_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('payed_id_seq', 19, true);


--
-- Data for Name: register; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY register (id, date_of_registration, student_id, student_class_id) FROM stdin;
147	2017-01-01 02:00:00	136	1
148	2001-01-01 00:00:00	1	117
141	2001-01-01 00:00:00	18	117
152	2001-01-01 00:00:00	151	117
154	2017-01-01 02:00:00	139	1
\.


--
-- Name: register_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('register_id_seq', 4, true);


--
-- Data for Name: student; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY student (id, fname, lname, date_of_birth, email, phone, facebook, manager_id) FROM stdin;
18	myros	myroslname	2013-04-02 11:35:42	myapos@yahoo.com	6979791029	https://www.facebook.com/myapos	17
139	another test	another test	2017-02-10 02:00:00	m@m.gr	6900000012	m@m.gr	17
144	tttt	tttt	2017-02-09 02:00:00	t@t.gr	6900000001	t@t.gr	17
136	myaposgmail	test	2017-01-19 00:00:00	myapos@gmail.com	6979791029	ff	17
1	myros3	m3123	1982-01-10 00:00:00	myapos@gmail.com	6979791029	myapos3@facebook.com	17
151	another 	test	2017-02-15 02:00:00	myapos@yahoo.com	6900000002	fff@facebook.com	17
\.


--
-- Data for Name: student_class; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY student_class (id, description, student_class_id) FROM stdin;
117	kvmg	117
1	kettlebelasd	117
\.


--
-- Name: student_class_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('student_class_id_seq', 2, true);


--
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('student_id_seq', 3, true);


--
-- Name: pk_databasechangeloglock; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);


--
-- Name: pk_manager; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY manager
    ADD CONSTRAINT pk_manager PRIMARY KEY (id);


--
-- Name: pk_payed; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY payed
    ADD CONSTRAINT pk_payed PRIMARY KEY (id);


--
-- Name: pk_register; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY register
    ADD CONSTRAINT pk_register PRIMARY KEY (id);


--
-- Name: pk_student; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY student
    ADD CONSTRAINT pk_student PRIMARY KEY (id);


--
-- Name: pk_student_class; Type: CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos; Tablespace: 
--

ALTER TABLE ONLY student_class
    ADD CONSTRAINT pk_student_class PRIMARY KEY (id);


--
-- Name: fk_classes; Type: FK CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY register
    ADD CONSTRAINT fk_classes FOREIGN KEY (student_class_id) REFERENCES student_class(id);


--
-- Name: fk_manager; Type: FK CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY student
    ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id);


--
-- Name: fk_register; Type: FK CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY payed
    ADD CONSTRAINT fk_register FOREIGN KEY (register_id) REFERENCES register(id);


--
-- Name: fk_students; Type: FK CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY register
    ADD CONSTRAINT fk_students FOREIGN KEY (student_id) REFERENCES student(id);


--
-- Name: fk_subclass; Type: FK CONSTRAINT; Schema: clientmanagerspringboot; Owner: myapos
--

ALTER TABLE ONLY student_class
    ADD CONSTRAINT fk_subclass FOREIGN KEY (student_class_id) REFERENCES student_class(id);


--
-- PostgreSQL database dump complete
--

