--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Debian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7 (Debian 11.7-0+deb10u1)

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

SET default_with_oids = false;

--
-- Name: class_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_info (
    class_number integer NOT NULL,
    course_department character varying(4) NOT NULL,
    course_subject integer NOT NULL,
    course_section integer,
    course_start time without time zone,
    course_end time without time zone,
    course_days character varying(5),
    course_location character varying(10),
    course_instructor character varying(45),
    course_campus character varying(10)
);


ALTER TABLE public.class_info OWNER TO postgres;

--
-- Name: completed_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.completed_courses (
    student_id integer NOT NULL,
    course_department character varying(4) NOT NULL,
    course_subject integer NOT NULL
);


ALTER TABLE public.completed_courses OWNER TO postgres;

--
-- Name: course_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_info (
    course_department character varying(4) NOT NULL,
    course_subject integer NOT NULL,
    course_description text,
    course_credits integer,
    course_name character varying(45)
);


ALTER TABLE public.course_info OWNER TO postgres;

--
-- Name: major_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.major_names (
    major_id integer NOT NULL,
    major_name character varying(45) NOT NULL
);


ALTER TABLE public.major_names OWNER TO postgres;

--
-- Name: student_majors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_majors (
    student_id integer NOT NULL,
    major_id integer NOT NULL
);


ALTER TABLE public.student_majors OWNER TO postgres;

--
-- Name: student_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_names (
    student_id integer NOT NULL,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL
);


ALTER TABLE public.student_names OWNER TO postgres;

--
-- Data for Name: class_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_info (class_number, course_department, course_subject, course_section, course_start, course_end, course_days, course_location, course_instructor, course_campus) FROM stdin;
\.


--
-- Data for Name: completed_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.completed_courses (student_id, course_department, course_subject) FROM stdin;
\.


--
-- Data for Name: course_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_info (course_department, course_subject, course_description, course_credits, course_name) FROM stdin;
\.


--
-- Data for Name: major_names; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.major_names (major_id, major_name) FROM stdin;
\.


--
-- Data for Name: student_majors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_majors (student_id, major_id) FROM stdin;
\.


--
-- Data for Name: student_names; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_names (student_id, first_name, last_name) FROM stdin;
\.


--
-- Name: class_info class_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_info
    ADD CONSTRAINT class_info_pkey PRIMARY KEY (class_number);


--
-- Name: completed_courses completed_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.completed_courses
    ADD CONSTRAINT completed_courses_pkey PRIMARY KEY (student_id, course_subject, course_department);


--
-- Name: course_info course_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_info
    ADD CONSTRAINT course_info_pkey PRIMARY KEY (course_department, course_subject);


--
-- Name: major_names major_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.major_names
    ADD CONSTRAINT major_names_pkey PRIMARY KEY (major_id);


--
-- Name: student_majors student_majors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_majors
    ADD CONSTRAINT student_majors_pkey PRIMARY KEY (student_id, major_id);


--
-- Name: student_names student_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_names
    ADD CONSTRAINT student_names_pkey PRIMARY KEY (student_id);


--
-- Name: class_info class_info_course_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_info
    ADD CONSTRAINT class_info_course_department_fkey FOREIGN KEY (course_department, course_subject) REFERENCES public.course_info(course_department, course_subject);


--
-- Name: completed_courses completed_courses_course_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.completed_courses
    ADD CONSTRAINT completed_courses_course_department_fkey FOREIGN KEY (course_department, course_subject) REFERENCES public.course_info(course_department, course_subject);


--
-- Name: completed_courses completed_courses_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.completed_courses
    ADD CONSTRAINT completed_courses_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student_names(student_id);


--
-- Name: student_majors student_majors_major_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_majors
    ADD CONSTRAINT student_majors_major_id_fkey FOREIGN KEY (major_id) REFERENCES public.major_names(major_id);


--
-- Name: student_majors student_majors_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_majors
    ADD CONSTRAINT student_majors_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student_names(student_id);


--
-- PostgreSQL database dump complete
--

