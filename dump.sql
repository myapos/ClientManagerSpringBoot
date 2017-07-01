--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = "Users", pg_catalog;

--
-- Data for Name: test; Type: TABLE DATA; Schema: Users; Owner: myapos
--

COPY test (id, data) FROM stdin;
2	test keimeno deuteris grammis
1	Τί είναι το Lorem Ipsum;\nΤο Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες της τυπογραφίας και στοιχειοθεσίας. Το Lorem Ipsum είναι το επαγγελματικό πρότυπο όσον αφορά το κείμενο χωρίς νόημα, από τον 15ο αιώνα, όταν ένας ανώνυμος τυπογράφος πήρε ένα δοκίμιο και ανακάτεψε τις λέξεις για να δημιουργήσει ένα δείγμα βιβλίου. Όχι μόνο επιβίωσε πέντε αιώνες, αλλά κυριάρχησε στην ηλεκτρονική στοιχειοθεσία, παραμένοντας με κάθε τρόπο αναλλοίωτο. Έγινε δημοφιλές τη δεκαετία του '60 με την έκδοση των δειγμάτων της Letraset όπου περιελάμβαναν αποσπάσματα του Lorem Ipsum, και πιο πρόσφατα με το λογισμικό ηλεκτρονικής σελιδοποίησης όπως το Aldus PageMaker που περιείχαν εκδοχές του Lorem Ipsum.\n\nΑπό που προέρχεται;\n\nΑντίθετα με αυτό που θεωρεί η πλειοψηφία, το Lorem Ipsum δεν είναι απλά ένα τυχαίο κείμενο. Οι ρίζες του βρίσκονται σε ένα κείμενο Λατινικής λογοτεχνίας του 45 π.Χ., φτάνοντας την ηλικία του πάνω από 2000 έτη. Ο Richard McClintock, καθηγητής Λατινικών στο κολλέγιο Hampden-Dydney στην Βιρτζίνια, αναζήτησε μία από τις πιο σπάνιες Λατινικές λέξεις, την consectetur, από ένα απόσπασμα του Lorem Ipsum, και ανάμεσα σε όλα τα έργα της κλασσικής λογοτεχνίας, ανακάλυψε την αναμφισβήτητη πηγή του. To Lorem Ipsum προέρχεται από τις ενότητες 1.10.32 και 1.10.33 του "de Finibus Bonorum et Malorum" (Τα άκρα του καλού και του κακού) από τον Cicero (Σισερό), γραμμένο το 45 π.Χ. Αυτό το βιβλίο είναι μία διατριβή στην θεωρία της Ηθικής, πολύ δημοφιλής κατά την αναγέννηση. Η πρώτη γραμμή του Lorem Ipsum, "Lorem ipsum dolor sit amet...", προέρχεται από μία γραμμή στην ενότητα 1.10.32.\n\nΤο καθιερωμένο κομμάτι του Lorem Ipsum που χρησιμοποιείται από τον 15ο αιώνα αναπαράγεται παρακάτω για αυτούς που ενδιαφέρονται. Οι ενότητες 1.10.32 και 1.10.33 από το "de Finibus Bonorum et Malorum" από τον Σισερό επίσης αναπαράγονται στην ακριβή αυθεντική τους μορφή, συνοδευόμενες από Αγγλικές εκδοχές από την μετάφραση του 1914 από τον H. Rackham.
16	σαδασδασδασ
\.


--
-- Name: test_ID_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('"test_ID_seq"', 17, true);


--
-- Name: test_data_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('test_data_seq', 1, false);


--
-- Name: user_role_ID_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('"user_role_ID_seq"', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: Users; Owner: myapos
--

COPY users (username, password, enabled) FROM stdin;
myrosuser	myrosuser	t
myrosadmin	myrosadmin	t
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: Users; Owner: myapos
--

COPY user_roles (user_role_id, username, role) FROM stdin;
1	myrosadmin	ROLE_ADMIN
2	myrosuser	ROLE_USER
\.


--
-- Name: user_roles_role_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('user_roles_role_seq', 1, false);


--
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('user_roles_user_role_id_seq', 2, true);


--
-- Name: user_roles_username_seq; Type: SEQUENCE SET; Schema: Users; Owner: myapos
--

SELECT pg_catalog.setval('user_roles_username_seq', 1, false);


SET search_path = clientmanagerspringboot, pg_catalog;

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

SELECT pg_catalog.setval('hibernate_sequence', 218, true);


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
-- Data for Name: student; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY student (id, fname, lname, date_of_birth, email, phone, facebook, manager_id) FROM stdin;
136	myaposgmail	test	2018-01-19 00:00:00	myapos123@gmail.com	6979791029	fffffff	17
200	ΔΕΥΤΕΡΟΣ	ΧΡΗΣΤΗΣ	2017-06-05 00:00:00	myapos@yahoo.com	6979791029	-	17
166	φφ	σδφσφ	2010-04-07 00:00:00	ddd@dd.gr	6979791029	ddd@dd.gr	17
1	myros3	m3123	2018-01-10 00:00:00	myapos@gmail.com	6979791029	myapos3@facebook.com	17
18	myros1	myroslname	2013-04-02 00:00:00	myapos@yahoo.com	6979791029	https://www.facebook.com/myapos	\N
139	another test123	another test	2017-02-12 00:00:00	m@m.gr	6900000019	m@m.gr	\N
169	test	test	2017-04-08 03:00:00	tes@tes.gr	6900000000	tes@tes.gr	\N
177	testttt	testttt	2017-04-13 03:00:00	myapos@yahoo.com	6900000000	myapos@yahoo.com	\N
151	another123456	test	2017-02-15 00:00:00	myapos@yahoo.com	6900000003	fff@facebook.com	17
194	ΕΝΑΣ	ΧΡΗΣΤΗΣ	2017-06-05 03:00:00	myapos@yahoo.com	6900000000	-	17
\.


--
-- Data for Name: student_class; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY student_class (id, description, student_class_id) FROM stdin;
4	No subclass	4
215	womens corner	1
117	kvmg	4
1	kettlebels	4
\.


--
-- Data for Name: register; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY register (id, date_of_registration, student_id, student_class_id) FROM stdin;
141	2001-01-01 00:00:00	18	1
206	2017-06-14 03:00:00	200	1
147	2001-06-10 03:00:00	136	1
207	2017-06-14 03:00:00	194	117
195	2000-12-31 02:00:00	194	117
\.


--
-- Data for Name: payed; Type: TABLE DATA; Schema: clientmanagerspringboot; Owner: myapos
--

COPY payed (id, payment, date_of_payment, notes, register_id) FROM stdin;
205	t	2001-06-07 00:00:00	aaaa123	195
\.


--
-- Name: payed_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('payed_id_seq', 19, true);


--
-- Name: register_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('register_id_seq', 4, true);


--
-- Name: student_class_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('student_class_id_seq', 4, true);


--
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: clientmanagerspringboot; Owner: myapos
--

SELECT pg_catalog.setval('student_id_seq', 3, true);


SET search_path = public, pg_catalog;

--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: myapos
--

COPY databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1	myapos	../database_liqui.json	2016-12-30 10:56:04.191599	1	EXECUTED	\N	createTable tableName=classes		\N	3.5.3	\N	\N	3088164049
1	myapos	../database_liqui_2.json	2016-12-30 11:11:49.995605	2	EXECUTED	\N	createTable tableName=students		\N	3.5.3	\N	\N	3089109909
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: myapos
--

COPY databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: myapos
--

COPY employee (id, description, first_name, last_name, version, manager_id) FROM stdin;
3	ring bearer	Frodo	Baggins	0	1
4	burglar	Bilbo	Baggins	0	1
5	wizard	Gandalf	the Grey	0	1
6	gardener	Samwise	Gamgee	0	2
7	pony rider	Merry	Brandybuck	0	2
8	pipe smoker	Peregrin	Took	0	2
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: myapos
--

SELECT pg_catalog.setval('hibernate_sequence', 1, false);


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: myapos
--

COPY student (id, email, facebook, fname, lname, phone) FROM stdin;
\.


SET search_path = test, pg_catalog;

--
-- Data for Name: manager; Type: TABLE DATA; Schema: test; Owner: myapos
--

COPY manager (id, name, password, roles) FROM stdin;
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: test; Owner: myapos
--

COPY employee (id, description, first_name, last_name, version, manager_id) FROM stdin;
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: test; Owner: myapos
--

COPY student (id, fname, lname, email, phone, facebook) FROM stdin;
1	weqwe	dwqd	dwq	dwd	dwq
2	fdsfd	fdsf	fdsfd	ffff	fff
3	ttt	tt	gg	ff	sdf
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: test; Owner: myapos
--

SELECT pg_catalog.setval('students_id_seq', 3, true);


SET search_path = test2, pg_catalog;

--
-- Data for Name: manager; Type: TABLE DATA; Schema: test2; Owner: myapos
--

COPY manager (id, name, password, roles) FROM stdin;
\.


--
-- Name: manager_id_seq; Type: SEQUENCE SET; Schema: test2; Owner: myapos
--

SELECT pg_catalog.setval('manager_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

